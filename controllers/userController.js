import User from '../models/User.js';
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import { v2 as cloudinary } from 'cloudinary';
// import { promises as fs } from 'fs';
import { formatImage } from '../middleware/multerMiddleware.js';

/**
 * @desc Get user profile
 * @method GET
 * @path /api/v1/users/current
 * @access Private
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    // Note: remove password field
    const user = await User.findById(userId).select('-password');

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update user profile
 * @method PATCH
 * @path /api/v1/users/current
 * @access Private
 */
export const updateUser = async (req, res, next) => {
  try {
    const updatedUserInfo = { ...req.body };

    if (req.file) {
      // Call helper function for formatting the image to prepare for cloudinary upload
      const file = formatImage(req.file);

      // Upload an image to cloudinary
      const uploadResult = await cloudinary.uploader.upload(file);

      updatedUserInfo.avatar = uploadResult.secure_url;
      updatedUserInfo.avatarPublicId = uploadResult.public_id;
    }

    // Note: it will return the user instance without the update
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updatedUserInfo
    );

    if (!updatedUser) {
      throw new NotFoundError('user not found');
    }

    // Destory the previous image stored in cloudinary if it has, and if there is new upload
    if (req.file && updatedUser.avatarPublicId) {
      await cloudinary.uploader.destroy(updatedUser.avatarPublicId);
    }

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'user updated successfully' });
  } catch (err) {
    next(err);
  }
};
