import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { isAllowToRequest } from '../utils/job.js';

// REUSABLE validation layer (define validation(as a param) and verify validation result)
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      // Verifying the validation result
      const errors = validationResult(req);

      // Handle errors and send back bad request responses with error messages
      if (!errors.isEmpty()) {
        const errMessages = errors.array().map((error) => error.msg);

        // Custom error messages and types
        if (errMessages[0].startsWith('no job')) {
          throw new NotFoundError(errMessages);
        }
        if (errMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError(errMessages);
        }

        // Default/fallback error
        throw new BadRequestError(errMessages);
      }

      // If no validation errors, move to the next middleware(to the controller logic)
      next();
    },
  ];
};

/* Validators for controllers */
// For job input
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company name is required'),
  body('position')
    .notEmpty()
    .withMessage('position is required')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('position name must be between 2 and 50 characters long'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid job status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job type value'),
]);

// For ID params, checking if it is a valid mongo id type,
// and the existence of a job given the id,
// and if the people who access the resource is an admin or the creator
// by using custom validator function https://express-validator.github.io/docs/6.0.0/validation-chain-api#customvalidator
export const validateIdParams = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoDBId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidMongoDBId) {
      throw new Error('ID is not a valid MongoDB _id, please Check ID');
    }

    const job = await Job.findById(value);
    if (!job) {
      throw new Error(`no job with id ${value}`);
    }

    const isAllowed = isAllowToRequest(job, req.user);
    if (!isAllowed) {
      throw new UnauthorizedError('not authorized to access this resource');
    }
  }),
]);

// For register user
export const validateRegisterUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email format is required')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error('Email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 20 })
    .withMessage('password must be at least 8 and at most 20 characters long'),
  body('location').notEmpty().withMessage('location is required'),
]);

// For login user
export const validateLoginUserInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email format is required'),
  body('password').notEmpty().withMessage('password is required'),
]);

// For update user info
export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email format is required')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });

      // Check if there is another existing user with the email we want to update in the DB
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('location').notEmpty().withMessage('location is required'),
  body('role').not().exists().withMessage('cannot update user role'), // Prevent updating the role
  body('password').not().exists().withMessage('cannot update password here'), // Prevent updating the pw here
]);

// For user request resetting password
export const validateForgetPasswordUserInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('valid email format is required'),
]);

// For user entering new password
export const validateNewPasswordUserInput = withValidationErrors([
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 20 })
    .withMessage('password must be at least 8 and at most 20 characters long'),
]);
