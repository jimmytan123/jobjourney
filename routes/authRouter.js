import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/login', validateLoginUserInput, login);
router.post('/register', validateRegisterUserInput, register);

export default router;
