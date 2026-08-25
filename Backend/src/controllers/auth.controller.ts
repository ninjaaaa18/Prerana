import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware';
import {
  AuthError,
  getCurrentUser,
  login,
  logout,
  refresh,
  register,
} from '../services/auth.service';

const sendAuthError = (res: Response, error: unknown): void => {
  if (error instanceof AuthError) {
    res.status(error.statusCode).json({ status: 'error', code: error.code, message: error.message });
    return;
  }
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: 'Internal Server Error',
  });
};

export const registerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (error) {
    sendAuthError(res, error);
  }
};

export const loginController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await login(req.body.email, req.body.password);
    res.json(result);
  } catch (error) {
    sendAuthError(res, error);
  }
};

export const refreshController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await refresh(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    sendAuthError(res, error);
  }
};

export const logoutController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await logout(req.body.refreshToken);
    res.status(204).send();
  } catch (error) {
    sendAuthError(res, error);
  }
};

export const meController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    res.json({ user: await getCurrentUser(req.user.id) });
  } catch (error) {
    sendAuthError(res, error);
  }
};
