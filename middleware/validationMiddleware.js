import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';

// REUSABLE validation layer
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      // Verifying the validation result
      const errors = validationResult(req);

      // Handle errors and send back bad request responses with error messages
      if (!errors.isEmpty()) {
        const errMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errMessages);
      }

      // If no validation errors, move to the next middleware
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
