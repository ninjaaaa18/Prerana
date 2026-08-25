import { Router } from 'express';
import { body } from 'express-validator';
import {
  loginController,
  logoutController,
  meController,
  refreshController,
  registerController,
} from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const email = body('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required');
const password = body('password').isString().isLength({ min: 8, max: 128 }).withMessage('Password must be 8 to 128 characters');

router.post(
  '/register',
  body('name').trim().isLength({ min: 1, max: 120 }).withMessage('Name is required'),
  email,
  password,
  body('role').isIn(['student', 'teacher', 'parent']).withMessage('A valid registration role is required'),
  validateRequest,
  registerController
);
router.post('/login', email, password, validateRequest, loginController);
router.post(
  '/refresh',
  body('refreshToken').isJWT().withMessage('Refresh token is required'),
  validateRequest,
  refreshController
);
router.post('/logout', logoutController);
router.get('/me', authenticateToken, meController);

export default router;
