import { nanoid } from 'nanoid';

// Local Data
let jobs = [
  {
    id: nanoid(),
    company: 'Apple',
    position: 'Back-end',
  },
  {
    id: nanoid(),
    company: 'Meta',
    position: 'Web Dev',
  },
];

// GET ALL JOBS
export const getAllJobs = async (req, res, next) => {
  res.status(200).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res, next) => {
  const company = req.body.company;
  const position = req.body.position;

  if (!company || !position) {
    return res
      .status(400)
      .json({ message: 'Missing company and position value.' });
  }

  const newJob = { id: nanoid(10), company, position };
  jobs.push(newJob);
  res.status(201).json({ job: newJob });
};

// GET SINGLE JOB
export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: `No job with ${id}` });
  }

  res.status(200).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    return res
      .status(400)
      .json({ message: 'Missing company and position value.' });
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: `No job with ${id}` });
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ message: 'Job Updated', job });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: `No job with ${id}` });
  }

  const updatedJobs = jobs.filter((job) => job.id !== id);
  jobs = updatedJobs;

  res.status(200).json({ message: 'Job Deleted' });
};
