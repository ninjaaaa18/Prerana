/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { authEvents, setAccessToken } from '@/lib/axios';
import {
  login as loginRequest,
  logout as logoutRequest,
  refresh as refreshRequest,
  register as registerRequest,
  type AuthApiError,
  type AuthResult,
  type AuthUser,
} from '@/features/auth/services/auth.service';
import type { UserRole } from '@/features/auth/types';
import { previewUser, UI_PREVIEW_ENABLED } from '@/lib/ui-preview'; // LOCAL UI PREVIEW ONLY — REMOVE BEFORE PRODUCTION

interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: { name: string; email: string; password: string; role: UserRole }) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);
const REFRESH_TOKEN_KEY = 'prerana.refresh-token';

const getStoredRefreshToken = (): string | null => sessionStorage.getItem(REFRESH_TOKEN_KEY);
const storeAuthResult = (result: AuthResult): void => {
  setAccessToken(result.accessToken);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, result.refreshToken);
};
const clearStoredSession = (): void => {
  setAccessToken(null);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => getStoredRefreshToken();

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // LOCAL UI PREVIEW ONLY — REMOVE BEFORE PRODUCTION
  // When UI_PREVIEW_ENABLED is true (local dev only), seed the auth context
  // with a minimal mock user so every protected screen renders without login.
  // This never activates in production builds.
  const [user, setUser] = React.useState<AuthUser | null>(
    UI_PREVIEW_ENABLED ? previewUser : null
  );
  const [isLoading, setIsLoading] = React.useState(UI_PREVIEW_ENABLED ? false : true);

  const applyAuthResult = React.useCallback((result: AuthResult): void => {
    storeAuthResult(result);
    setUser(result.user);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const restoreSession = async (): Promise<void> => {
      const refreshToken = getStoredRefreshToken();
      if (!refreshToken) {
        if (!cancelled) setIsLoading(false);
        return;
      }

      try {
        const result = await refreshRequest(refreshToken);
        if (!cancelled) applyAuthResult(result);
      } catch {
        clearStoredSession();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    if (UI_PREVIEW_ENABLED) return; // LOCAL UI PREVIEW ONLY — REMOVE BEFORE PRODUCTION
    void restoreSession();
    return () => {
      cancelled = true;
    };
  }, [applyAuthResult]);

  React.useEffect(() => {
    const handleSessionExpired = (): void => {
      clearStoredSession();
      setUser(null);
    };
    if (UI_PREVIEW_ENABLED) return; // LOCAL UI PREVIEW ONLY — REMOVE BEFORE PRODUCTION
    return authEvents.onExpired(handleSessionExpired);
  }, []);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    const result = await loginRequest(email, password);
    applyAuthResult(result);
    return result.user;
  };

  const register = async (input: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<AuthUser> => {
    return registerRequest(input).then((result) => {
      applyAuthResult(result);
      return result.user;
    });
  };

  const logout = async (): Promise<void> => {
    const refreshToken = getStoredRefreshToken();
    clearStoredSession();
    // LOCAL UI PREVIEW ONLY — REMOVE BEFORE PRODUCTION
    if (!UI_PREVIEW_ENABLED) {
      setUser(null);
    }
    try {
      await logoutRequest(refreshToken ?? undefined);
    } catch {
      // Local session state is already cleared; logout remains safe when offline.
    }
  };

  const value: AuthContextValue = {
    user,
    role: user?.role ?? null,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const getAuthErrorMessage = (error: unknown): string => {
  const apiError = error as { response?: { data?: AuthApiError } };
  const code = apiError.response?.data?.code;
  if (code === 'INVALID_CREDENTIALS') return 'The email or password is incorrect.';
  if (code === 'EMAIL_IN_USE') return 'An account with this email already exists.';
  if (code === 'VALIDATION_ERROR') return 'Please check the submitted details.';
  if (code === 'NETWORK_ERROR' || !apiError.response) return 'Unable to reach Prerana. Please try again.';
  return apiError.response.data?.message ?? 'Something went wrong. Please try again.';
};

export const useAuthContext = (): AuthContextValue => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
