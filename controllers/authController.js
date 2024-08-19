import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { getHashedPassword, isPasswordMatched } from '../utils/password.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/token.js';

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
