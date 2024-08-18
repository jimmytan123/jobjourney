import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

export const register = async (req, res, next) => {
  res.status(201).json({ message: 'User created' });
};

export const login = async (req, res, next) => {
  res.status(200).json({ message: 'User login' });
};
