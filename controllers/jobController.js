import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

/**
 * @desc Get all jobs
 * @method GET
 * @path /api/v1/jobs
 * @access PRIVATE
 */
export const getAllJobs = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const jobs = await Job.find({ createdBy: userId });
    res.status(StatusCodes.OK).json({ jobs });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Create a job
 * @method POST
 * @path /api/v1/jobs
 * @access PRIVATE
 */
export const createJob = async (req, res, next) => {
  try {
    // Add createdBy field from req user obj to the req body obj
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job: job });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get a single job
 * @method GET
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const getJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      throw new NotFoundError(`No job with id ${id}`);
    }

    res.status(StatusCodes.OK).json({ job });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update a single job
 * @method PATCH
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  // const { company, position } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Then will return the job after the update was applied
    );

    if (!updatedJob) {
      throw new NotFoundError(`No job with id ${id}`);
    }

    res.status(StatusCodes.OK).json({ message: 'Job Updated', updatedJob });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Delete a single job
 * @method DELETE
 * @path /api/v1/jobs/:id
 * @access PRIVATE
 */
export const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const removedJob = await Job.findByIdAndDelete(id);

    if (!removedJob) {
      throw new NotFoundError(`No job with ${id}`);
    }

    res.status(StatusCodes.OK).json({ message: 'Job Deleted' });
  } catch (err) {
    next(err);
  }
};
