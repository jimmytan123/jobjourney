import User from '../models/User.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @desc Get app stats, only admin can access
 * @method GET
 * @path /api/v1/admin/app-stats
 * @access Private
 */
export const getStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
    const jobsCount = await Job.countDocuments();

    res.status(StatusCodes.OK).json({ usersCount, jobsCount });
  } catch (err) {
    next(err);
  }
};
