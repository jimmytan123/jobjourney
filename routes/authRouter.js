import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { validateRegisterUserInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', validateRegisterUserInput, register);

export default router;
