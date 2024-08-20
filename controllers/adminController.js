import User from '../models/User.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @desc Get app stats
 * @method GET
 * @path /api/v1/admin/app-stats
 * @access Private
 */
export const getStats = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: 'Get app stats' });
};
