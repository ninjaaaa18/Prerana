import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;
const REFRESH_TOKEN_KEY = 'prerana.refresh-token';
const expiredListeners = new Set<() => void>();

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

export const authEvents = {
  onExpired: (listener: () => void): (() => void) => {
    expiredListeners.add(listener);
    return () => expiredListeners.delete(listener);
  },
  notifyExpired: (): void => expiredListeners.forEach((listener) => listener()),
};

interface RetryConfig extends InternalAxiosRequestConfig {
  _authRetry?: boolean;
  _skipAuthRefresh?: boolean;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    if (error.response?.status !== 401 || !config || config._authRetry || config._skipAuthRefresh || config.url?.endsWith('/auth/refresh')) {
      return Promise.reject(error);
    }

    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      authEvents.notifyExpired();
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = axios
        .post<{ accessToken: string; refreshToken: string }>(`${apiClient.defaults.baseURL}/auth/refresh`, { refreshToken }, {
          headers: { 'Content-Type': 'application/json' },
          timeout: apiClient.defaults.timeout,
        })
        .then((response) => {
          setAccessToken(response.data.accessToken);
          sessionStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
          return response.data.accessToken;
        })
        .catch(() => {
          sessionStorage.removeItem(REFRESH_TOKEN_KEY);
          setAccessToken(null);
          authEvents.notifyExpired();
          return null;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const renewedToken = await refreshPromise;
    if (!renewedToken) return Promise.reject(error);
    config._authRetry = true;
    config.headers.set('Authorization', `Bearer ${renewedToken}`);
    return apiClient(config);
  }
);

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken && !config.url?.endsWith('/auth/login') && !config.url?.endsWith('/auth/register')) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
});
