import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

// GET ALL JOBS
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(StatusCodes.OK).json({ jobs });
  } catch (err) {
    next(err);
  }
};

// CREATE JOB
export const createJob = async (req, res, next) => {
  // const { company, position } = req.body;

  try {
    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job: job });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE JOB
export const getJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      throw new NotFoundError(`No job with ${id}`);
    }

    res.status(StatusCodes.OK).json({ job });
  } catch (err) {
    next(err);
  }
};

// EDIT JOB
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
      throw new NotFoundError(`No job with ${id}`);
    }

    res.status(StatusCodes.OK).json({ message: 'Job Updated', updatedJob });
  } catch (err) {
    next(err);
  }
};

// DELETE JOB
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
