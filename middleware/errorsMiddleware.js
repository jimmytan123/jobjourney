export const customErrorHandler = (err, req, res, next) => {
  console.log(err);

  let statusCode = err.statusCode || 500; // default status code 500
  let message = err.message;

  // This is when mongoose failed to cast a value.
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found.';
  }

  res.status(statusCode).json({ message: message });
};
