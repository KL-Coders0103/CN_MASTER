import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';
import quizRoutes from './routes/quizRoutes';
import aiRoutes from './routes/aiRoutes';

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try again later.',
});

app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/ai', aiRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `✅ CN Master Backend running on http://localhost:${PORT}`
  );
});