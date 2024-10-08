import { StatusCodes } from 'http-status-codes';

export const customErrorHandler = (err, req, res, next) => {
  console.log(err);

  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // default status code 500
  let message = err.message || 'Something went wrong. Please try again later.';

  // This is when mongoose failed to cast a value.
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = StatusCodes.NOT_FOUND;
    message = 'CastError. Resource not found.';
  }

  res.status(statusCode).json({ message });
};
