import { StatusCodes } from 'http-status-codes';

// NotFoundError to extends the native JS Error class
export class NotFoundError extends Error {
  constructor(message) {
    super(message);

    // Pre-set properties for the NotFoundError class
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

// Server do not understand the request due to invalid syntax
export class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// User not recognized by the server, user must authenticated itself
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

// User not have rights to the content, but user is recognized by the server
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
