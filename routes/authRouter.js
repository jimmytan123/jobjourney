import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/login', validateLoginUserInput, login);
router.post('/register', validateRegisterUserInput, register);
router.get('/logout', logout);

export default router;
