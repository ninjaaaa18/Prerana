import type { UserRole } from './types';

export const getDefaultRouteForRole = (role: UserRole): string => {
  if (role === 'parent') return '/app/parent';
  if (role === 'teacher') return '/app/teach';
  if (role === 'admin') return '/app/admin';
  return '/app';
};
