import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULLTIME,
    },
    jobLocation: {
      type: String,
      default: 'my current city',
    },
  },
  { timestamps: true }
);

// Define mongoose Job model
const Job = mongoose.model('Job', JobSchema);

export default Job;
