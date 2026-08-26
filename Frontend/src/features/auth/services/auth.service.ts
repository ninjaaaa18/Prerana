import { apiClient } from '@/lib/axios';
import type { UserRole } from '../types';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

interface UserResponse {
  user: AuthUser;
}

export interface AuthApiError {
  code?: string;
  message?: string;
  details?: Record<string, string[]>;
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
  const response = await apiClient.post<AuthResult>('/auth/login', { email, password });
  return response.data;
};

export const register = async (input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<AuthResult> => {
  const response = await apiClient.post<AuthResult>('/auth/register', input);
  return response.data;
};

export const refresh = async (refreshToken: string): Promise<AuthResult> => {
  const response = await apiClient.post<AuthResult>('/auth/refresh', { refreshToken });
  return response.data;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await apiClient.get<UserResponse>('/auth/me');
  return response.data.user;
};

export const logout = async (refreshToken?: string): Promise<void> => {
  await apiClient.post('/auth/logout', { refreshToken });
};
