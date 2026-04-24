import axios from 'axios';
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
        window.location.href = '/sign-in';
      }
    }

    return Promise.reject(err);
  },
);
