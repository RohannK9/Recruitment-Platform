import express from 'express';
import {
  createJob,
  listJobs,
  getJob,
  applyJob,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validationResultHandler } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public
router.get('/', listJobs);
router.get('/:id', getJob);
router.post(
  '/:id/apply',
  [
    body('applicantName').notEmpty().withMessage('Name is required'),
    body('applicantEmail').isEmail().withMessage('Valid email required'),
  ],
  validationResultHandler,
  applyJob
);

// Protected
router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  validationResultHandler,
  createJob
);

export default router;
