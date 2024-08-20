import { UnauthenticatedError } from '../errors/customErrors.js';
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

    // Store an user object in the request object
    req.user = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };

    // Move forward
    next();
  } catch (err) {
    // To catch something wrong when verifying the JWT
    next(new UnauthenticatedError('authentication invalid'));
  }
};
