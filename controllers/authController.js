import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import crypto from 'crypto';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { getHashedPassword, isPasswordMatched } from '../utils/password.js';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { createJWT } from '../utils/token.js';
import { NotFoundError } from '../errors/customErrors.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * @desc REGISTER
 * @method POST
 * @path /api/v1/auth/register
 * @access PUBLIC
 */
export const register = async (req, res, next) => {
  try {
    // Logic for admin user -> the first user in the DB will ONLY be the admin role
    const usersCount = await User.countDocuments();
    req.body.role = usersCount === 0 ? 'admin' : 'user';

    // Convert password into the hashed version
    const { password } = req.body;
    const hashedPassword = await getHashedPassword(password);
    req.body.password = hashedPassword;

    // Create user in DB
    const user = await User.create(req.body);

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'user created successfully', email: user.email });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc LOGIN
 * @method POST
 * @path /api/v1/auth/login
 * @access PUBLIC
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // Check the existence of the user and compare passwords
    const isValidUserAndPassword =
      user && (await isPasswordMatched(password, user.password));

    if (!isValidUserAndPassword) {
      throw new UnauthenticatedError('Invalid email or password');
    }

    // Create JWT token
    const token = createJWT({ userId: user._id, role: user.role });

    // Send back HTTP-only jwt cookie
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // expires in 1 day in milleseconds from now
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(StatusCodes.OK).json({ message: 'Login successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc LOGOUT
 * @method GET
 * @path /api/v1/auth/logout
 * @access PUBLIC
 */
export const logout = (req, res, next) => {
  // Destroy token cookie, expires immediately
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ message: 'Logout successfully' });
};

/**
 * @desc Generate an email with a reset link
 * @method POST
 * @path /api/v1/auth/reset
 * @access PUBLIC
 */
export const reset = async (req, res, next) => {
  // Generate a reset token
  crypto.randomBytes(32, async (error, buffer) => {
    if (error) {
      next(err);
    }

    // Generate a password reset token
    const token = buffer.toString('hex');

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Set user reset token and expiry date, save in the DB
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 1000 * 60 * 30; // Expires in 30 mins
      await user.save();

      const resetLink = `${process.env.BASE_URL}/reset/${token}`;

      // Send email with a reset link
      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: req.body.email,
        subject: 'Reset Your Password - Job Journey',
        html: `
        <h2>Hi there,</h2>
        <p>We received a request to reset your password. You can reset your password by clicking the button below:</p>
        <p>Click this <a href=${resetLink}>link</a> to reset your password.</p>
        <p>Please note that the reset link is only valid for 30 mins.</p>
        <p>Thanks,<br />The Job Journey Support Team</p>
        <p>If you didn't request a password reset, please ensure your account's security.</p>
        `,
      });

      res.status(StatusCodes.OK).json({ message: 'Reset email sent' });
    } catch (err) {
      next(err);
    }
  });
};

/**
 * @desc Update user password
 * @method POST
 * @path /api/v1/auth/newpassword
 * @access PUBLIC
 */
export const newPassword = async (req, res, next) => {
  const token = req.body.token;
  const password = req.body.password;
  
  try {
    // Find the user with the token only if the token does not expired
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestError(
        'Something went wrong, please try resetting again'
      );
    }

    const hashedPassword = await getHashedPassword(password);

    // Save user with the updated info
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Password update successfully' });
  } catch (err) {
    next(err);
  }
};
