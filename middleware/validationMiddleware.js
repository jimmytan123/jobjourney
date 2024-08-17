import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';
import mongoose from 'mongoose';
// import Job from '../models/Job.js';

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
// and the existence of a job if the id parm is valid (commented out by now)
// by using custom validator function https://express-validator.github.io/docs/6.0.0/validation-chain-api#customvalidator
export const validateIdParams = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidMongoDBId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidMongoDBId) {
      throw new Error('ID is not a valid MongoDB _id, please Check ID');
    }

    // const job = await Job.findById(value);
    // if (!job) {
    //   throw new Error(`No job with ${value}`);
    // }
  }),
]);
