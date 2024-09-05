import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateLoginUserInput,
  validateRegisterUserInput,
} from '../middleware/validationMiddleware.js';
import { rateLimit } from 'express-rate-limit';

const router = Router();

// Limiter for limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 100 requests per `window`, which will trigger a 429  Too Many Requests error
  message: { message: 'IP rate limit exceeded, retry after 15 minutes' },
});

router.post('/login', limiter, validateLoginUserInput, login);
router.post('/register', limiter, validateRegisterUserInput, register);
router.get('/logout', logout);

export default router;
