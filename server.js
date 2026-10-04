import app from './app.js';
import mongoose from 'mongoose';

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
