import { Router } from 'express';
import { getStats } from '../controllers/adminController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import { USER_TYPE } from '../utils/constant.js';

const router = Router();

router.get('/app-stats', authorizePermissions(USER_TYPE.ADMIN), getStats);

export default router;
