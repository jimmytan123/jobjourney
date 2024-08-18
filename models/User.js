import mongoose, { Schema } from 'mongoose';
import { USER_TYPE } from '../utils/constant.js';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      default: 'last name',
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: 'my current city',
    },
    role: {
      type: String,
      enum: Object.values(USER_TYPE), // ['user', 'admin']
      default: USER_TYPE.USER,
    },
    // jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true }
);

// Define mongoose User model
const User = mongoose.model('User', UserSchema);

export default User;
