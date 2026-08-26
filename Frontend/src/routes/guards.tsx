import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/use-auth';
import type { UserRole } from '@/features/auth/types';
import { getDefaultRouteForRole } from '@/features/auth/utils';

const AuthLoading: React.FC = () => (
  <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Checking authentication">
    <Spinner size="lg" />
  </div>
);

export const RequireAuth: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoading />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
};

export interface RequireRoleProps {
  roles: UserRole[];
}

export const RequireRole: React.FC<RequireRoleProps> = ({ roles }) => {
  const { role, isLoading } = useAuth();
  if (isLoading) return <AuthLoading />;
  if (!role || !roles.includes(role)) return <Navigate to="/403" replace />;
  return <Outlet />;
};

export const GuestOnly: React.FC = () => {
  const { isAuthenticated, isLoading, role } = useAuth();
  if (isLoading) return <AuthLoading />;
  if (isAuthenticated && role) return <Navigate to={getDefaultRouteForRole(role)} replace />;
  return <Outlet />;
};
