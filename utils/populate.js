import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';

import Job from '../models/Job.js';
import User from '../models/User.js';

try {
  await mongoose.connect(process.env.MONGO_URL);

  // Find test user - only run once
  const user = await User.findOne({ email: 'test@email.com' });

  // Find admin user
//   const user = await User.findOne({ email: 'jim@email.com' });

  // parse mock data
  const jsonJobs = JSON.parse(
    await readFile(new URL('./MOCK_DATA.json', import.meta.url))
  );

  // add createdBy to each mocked job object
  const jobs = jsonJobs.map((job) => {
    return {
      ...job,
      createdBy: user._id,
    };
  });

  // clear the jobs
  await Job.deleteMany({ createdBy: user._id });

  // insert jobs to DB
  await Job.create(jobs);

  console.log('populate jobs success!');

  process.exit(0);
} catch (err) {
  console.log(err);
  process.exit(1);
}
