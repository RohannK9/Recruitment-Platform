import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Load environment variables early
dotenv.config();
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/interviews', interviewRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
