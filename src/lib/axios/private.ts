import axios from 'axios';
import { routing } from '@/i18n/routing';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

export const privateApi = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

privateApi.interceptors.request.use((config) => {
  const { jwt, userType } = useAuthStore.getState();
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
  if (userType) config.headers['X-User-Type'] = userType;
  return config;
});

privateApi.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      useAuthStore.getState().logout();
      if (!window.location.pathname.includes('/sign-in')) {
        // Preserve a non-default locale prefix; the proxy injects the portal
        // from the host, so the path stays portal-agnostic and same-origin.
        const seg = window.location.pathname.split('/')[1];
        const isLocale = (routing.locales as readonly string[]).includes(seg);
        window.location.href = isLocale ? `/${seg}/sign-in` : '/sign-in';
      }
    }

    return Promise.reject(err);
  },
);
