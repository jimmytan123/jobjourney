import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

// @desc Register a new user
// route POST /api/v1/auth/register
// @access Public
export const register = async (req, res, next) => {
  const { name, lastName, email, password, location, role } = req.body;

  try {
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  res.status(200).json({ message: 'User login' });
};
