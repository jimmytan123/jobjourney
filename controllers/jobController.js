import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';

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
  const { company, position } = req.body;

  try {
    const job = await Job.create({
      company,
      position,
    });

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
      const error = new Error(`No job with ${id}`);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    res.status(StatusCodes.OK).json({ job });
  } catch (err) {
    next(err);
  }
};

// EDIT JOB
export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        company,
        position,
      },
      { new: true } // Then will return the job after the update was applied
    );

    if (!updatedJob) {
      const error = new Error(`No job with ${id}`);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
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
      const error = new Error(`No job with ${id}`);
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    res.status(StatusCodes.OK).json({ message: 'Job Deleted' });
  } catch (err) {
    next(err);
  }
};