import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { customErrorHandler } from './middleware/errorsMiddleware.js';

// Import routers
import jobRouter from './routes/jobRouter.js';

const app = express();

/* CONFIGS */
dotenv.config();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //HTTP request logger middleware
}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// API routes
app.use('/api/v1/jobs', jobRouter);

// NOT FOUND Route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Custom Error Route
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