import { Router } from 'express';
import { getUserProfile, updateUser } from '../controllers/userController.js';

const router = Router();

router.get('/current', getUserProfile);
router.patch('/current', updateUser);

export default router;
