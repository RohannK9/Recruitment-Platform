import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  validateRegister,
  validateLogin,
} from '../validation/authValidation.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/profile', protect, getProfile);

export default router;
