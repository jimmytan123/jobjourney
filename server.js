import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';

// Import middlewares
import { authenticateUser } from './middleware/authMiddleware.js';
import { customErrorHandler } from './middleware/errorMiddleware.js';

// Import routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';

// Public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

/* CONFIGS */
dotenv.config();

// Logger configs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //HTTP request logger middleware
}

// Static folder configs (public folder)
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));

// Parser configs
app.use(express.json());
app.use(cookieParser());

// Cloudinary configs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/admin', authenticateUser, adminRouter);

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
