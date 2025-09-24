import asyncHandler from 'express-async-handler';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Interview from '../models/Interview.js';

// @desc    Get summary counts for dashboard
// @route   GET /api/summary
// @access  Private
export const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const jobIds = await Job.find({ createdBy: userId }).distinct('_id');
  const jobCount = jobIds.length;
  const applicationCount = await Application.countDocuments({ job: { $in: jobIds } });
  const interviewCount = await Interview.countDocuments({});

  res.json({ jobCount, applicationCount, interviewCount });
});
