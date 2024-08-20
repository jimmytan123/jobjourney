import { Router } from 'express';
import { getStats } from '../controllers/adminController.js';

const router = Router();

router.get('/app-stats', getStats);

export default router;
