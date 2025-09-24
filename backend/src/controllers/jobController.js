import asyncHandler from 'express-async-handler';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
export const createJob = asyncHandler(async (req, res) => {
  const { title, description, location, salaryRange } = req.body;

  const job = await Job.create({
    title,
    description,
    location,
    salaryRange,
    createdBy: req.user._id,
  });

  res.status(201).json(job);
});

// @desc    List all open jobs
// @route   GET /api/jobs
// @access  Public
export const listJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ status: 'open' }).sort({ createdAt: -1 });
  res.json(jobs);
});

// @desc    Get a job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  res.json(job);
});

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
// @access  Public
export const applyJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  const { applicantName, applicantEmail, resumeUrl } = req.body;

  const application = await Application.create({
    job: job._id,
    applicantName,
    applicantEmail,
    resumeUrl,
  });

  res.status(201).json(application);
});
