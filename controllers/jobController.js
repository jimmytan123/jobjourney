import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import day from 'dayjs';

/**
 * @desc Get all jobs
 * @method GET
 * @path /api/v1/jobs
 * @access PRIVATE
 */
export const getAllJobs = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Query params from URL
    const { search, jobStatus, jobType, sort } = req.query;

    // Initialize query object
    const queryObj = { createdBy: userId };

    // Update query object if query params, search terms will look for regex match for positions or companies
    if (search) {
      queryObj.$or = [
        {
          position: { $regex: search, $options: 'i' },
        },
        {
          company: { $regex: search, $options: 'i' },
        },
      ];
    }

    if (jobStatus && jobStatus !== 'all') {
      queryObj.jobStatus = jobStatus;
    }

    if (jobType && jobType !== 'all') {
      queryObj.jobType = jobType;
    }

    // Define possible sort options
    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'position',
      'z-a': '-position',
    };

    // Set sort key based on query param 'sort', defaulted to newest
    const sortKey = sortOptions[sort] || sortOptions.newest;

    // Pagniation logic
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

    // Total number of jobs with the query configs
    const totalJobs = await Job.countDocuments(queryObj);
    const numOfPages = Math.ceil(totalJobs / limit);

    res
      .status(StatusCodes.OK)
      .json({ totalJobs, numOfPages, currentPage: page, jobs });
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

/**
 * @desc Return stats info
 * @method GET
 * @path /api/v1/jobs/stats
 * @access PRIVATE
 */
export const showStats = async (req, res, next) => {
  // Aggregate call, return the count of each job types
  let countStats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // Find all the jobs created by the current user
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  countStats = countStats.reduce((acc, curr) => {
    const { _id: jobStatusTitle, count } = curr;

    acc[jobStatusTitle] = count;

    return acc;
  }, {});

  const jobStatusStats = {
    pending: countStats.pending || 0,
    interview: countStats.interview || 0,
    declined: countStats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // Find all the jobs created by the current user
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      return {
        date: day()
          .month(item._id.month - 1)
          .year(item._id.year)
          .format('MMM YY'),
        count: item.count,
      };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ jobStatusStats, monthlyApplications });
};
