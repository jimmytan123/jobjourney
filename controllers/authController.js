import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { getHashedPassword } from '../utils/password.js';

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

export const login = async (req, res, next) => {
  res.status(200).json({ message: 'User login' });
};
