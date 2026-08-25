import { createHash, randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma';
import { config } from '../config/env';
import { hashPassword, verifyPassword } from '../utils/password';
import type { Role, User } from '@prisma/client';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

export class AuthError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

const publicUser = (user: User): SafeUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const tokenHash = (token: string): string => createHash('sha256').update(token).digest('hex');

const issueTokens = async (user: User): Promise<AuthResult> => {
  const sessionId = randomUUID();
  const accessToken = jwt.sign({ type: 'access', role: user.role }, config.jwtAccessSecret, {
    subject: user.id,
    expiresIn: config.accessTokenExpiresIn as jwt.SignOptions['expiresIn'],
  });
  const refreshToken = jwt.sign({ type: 'refresh', role: user.role }, config.jwtRefreshSecret, {
    subject: user.id,
    jwtid: sessionId,
    expiresIn: config.refreshTokenExpiresIn as jwt.SignOptions['expiresIn'],
  });
  const decoded = jwt.decode(refreshToken);
  if (!decoded || typeof decoded === 'string' || typeof decoded.exp !== 'number') {
    throw new AuthError('Could not create session', 500, 'SESSION_ERROR');
  }

  await prisma.session.create({
    data: {
      id: sessionId,
      tokenHash: tokenHash(refreshToken),
      userId: user.id,
      expiresAt: new Date(decoded.exp * 1000),
    },
  });

  return { user: publicUser(user), accessToken, refreshToken };
};

const findActiveUser = async (email: string): Promise<User | null> =>
  prisma.user.findUnique({ where: { email } });

export const register = async (input: {
  name: string;
  email: string;
  password: string;
  role: Exclude<Role, 'admin'>;
}): Promise<AuthResult> => {
  const existing = await findActiveUser(input.email);
  if (existing) throw new AuthError('An account with these details already exists', 409, 'EMAIL_IN_USE');

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
      role: input.role,
    },
  });
  return issueTokens(user);
};

export const login = async (email: string, password: string): Promise<AuthResult> => {
  const user = await findActiveUser(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new AuthError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }
  if (!user.isActive) throw new AuthError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  return issueTokens(user);
};

const verifyRefreshToken = (refreshToken: string): { userId: string; sessionId: string } => {
  try {
    const payload = jwt.verify(refreshToken, config.jwtRefreshSecret);
    if (typeof payload === 'string' || payload.type !== 'refresh' || typeof payload.sub !== 'string' || typeof payload.jti !== 'string') {
      throw new Error('Invalid refresh token');
    }
    return { userId: payload.sub, sessionId: payload.jti };
  } catch {
    throw new AuthError('Refresh session is invalid or expired', 401, 'INVALID_REFRESH_TOKEN');
  }
};

export const refresh = async (refreshToken: string): Promise<AuthResult> => {
  const { userId, sessionId } = verifyRefreshToken(refreshToken);
  const session = await prisma.session.findUnique({ where: { id: sessionId }, include: { user: true } });
  if (!session || session.userId !== userId || session.revokedAt || session.expiresAt <= new Date() || session.tokenHash !== tokenHash(refreshToken) || !session.user.isActive) {
    throw new AuthError('Refresh session is invalid or expired', 401, 'INVALID_REFRESH_TOKEN');
  }

  await prisma.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
  return issueTokens(session.user);
};

export const logout = async (refreshToken?: string): Promise<void> => {
  if (!refreshToken) return;
  try {
    const { sessionId } = verifyRefreshToken(refreshToken);
    await prisma.session.updateMany({
      where: { id: sessionId, tokenHash: tokenHash(refreshToken), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  } catch (error) {
    if (error instanceof AuthError) return;
    throw error;
  }
};

export const getCurrentUser = async (userId: string): Promise<SafeUser> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) throw new AuthError('Authentication required', 401, 'UNAUTHORIZED');
  return publicUser(user);
};
