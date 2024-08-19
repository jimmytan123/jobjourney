import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { StatusCodes } from 'http-status-codes';

// Import middlewares
import { authenticateUser } from './middleware/authMiddleware.js';
import { customErrorHandler } from './middleware/errorMiddleware.js';

// Import routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';

const app = express();

/* CONFIGS */
dotenv.config();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //HTTP request logger middleware
}
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// API routes
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);

// NOT FOUND Route
app.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
});

// Custom Error Handler Route
app.use(customErrorHandler);

const port = process.env.PORT || 5100;

try {
  const connect = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${connect.connection.host}`);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1); // Exit with failure
}
