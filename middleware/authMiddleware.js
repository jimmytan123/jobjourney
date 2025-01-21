import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/token.js';

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  // Check existence of a cookie token, throw error immediately if no token present
  if (!token) {
    next(new UnauthenticatedError('no token provided in the request'));
  }

  try {
    // Verify JWT to get the data
    const decodedToken = verifyJWT(token);

    // Check if the jwt token user id is the Demo/Test user id
    const isTestUser = decodedToken.userId === '66ce1027dab3e724c81d9986';

    // Store an user object in the request object
    req.user = {
      userId: decodedToken.userId,
      role: decodedToken.role,
      isTestUser: isTestUser,
    };

    // Move forward
    next();
  } catch (err) {
    // To catch something wrong when verifying the JWT
    next(new UnauthenticatedError('authentication invalid'));
  }
};

// Accept a number of roles, return the middleware function
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(roles); // ['admin'];

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('user not authorized to this route');
    }

    next();
  };
};

// Check for test user, only have read access
export const checkForTestUser = (req, res, next) => {
  if (req.user.isTestUser) {
    throw new BadRequestError('Test user - only have read access');
  }

  // Other users can move forward
  next();
};
