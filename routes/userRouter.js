import { Router } from 'express';
import { getUserProfile, updateUser } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/current', getUserProfile);
router.patch(
  '/current',
  checkForTestUser,
  upload.single('avatar'), // accept a single file upload name 'avatar'
  validateUpdateUserInput,
  updateUser
);

export default router;
