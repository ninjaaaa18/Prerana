import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import type { Role } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtAccessSecret);
    if (typeof payload === 'string' || payload.type !== 'access' || typeof payload.sub !== 'string' || !isRole(payload.role)) {
      res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
      return;
    }
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ status: 'error', code: 'UNAUTHORIZED', message: 'Authentication required' });
  }
};

const isRole = (value: unknown): value is Role =>
  value === 'student' || value === 'teacher' || value === 'parent' || value === 'admin';
