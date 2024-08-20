import { Router } from 'express';
import { getUserProfile, updateUser } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.get('/current', getUserProfile);
router.patch('/current', validateUpdateUserInput, updateUser);

export default router;
