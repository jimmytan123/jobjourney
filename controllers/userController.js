import User from '../models/User.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

/**
 * @desc Get user profile
 * @method GET
 * @path /api/v1/users/current
 * @access Private
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    // Note: remove password field
    const user = await User.findById(userId).select('-password');

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update user profile
 * @method PATCH
 * @path /api/v1/users/current
 * @access Private
 */
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body);

    if (!user) {
      throw new NotFoundError('user not found');
    }

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'user updated successfully' });
  } catch (err) {
    next(err);
  }
};
