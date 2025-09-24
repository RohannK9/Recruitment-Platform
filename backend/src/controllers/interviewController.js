import asyncHandler from 'express-async-handler';
import Application from '../models/Application.js';
import Interview from '../models/Interview.js';
import { body, validationResult } from 'express-validator';

export const validateInterview = [
  body('applicationId').isMongoId().withMessage('Valid applicationId required'),
  body('scheduledFor').isISO8601().withMessage('Valid date required'),
];

// @desc Schedule interview
// @route POST /api/interviews
// @access Private
export const scheduleInterview = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { applicationId, scheduledFor } = req.body;

  const application = await Application.findById(applicationId);
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  const interview = await Interview.create({
    application: applicationId,
    scheduledFor,
  });

  res.status(201).json(interview);
});
