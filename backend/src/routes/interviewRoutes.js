import express from 'express';
import { scheduleInterview, validateInterview } from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validationResultHandler } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', protect, validateInterview, validationResultHandler, scheduleInterview);

export default router;
