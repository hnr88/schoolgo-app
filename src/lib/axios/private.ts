import axios from 'axios';
import { env } from '@/lib/env';
import { useAuthStore } from '@/modules/auth';

export const privateApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

privateApi.interceptors.request.use((config) => {
  const { token, userType } = useAuthStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (userType) config.headers['X-User-Type'] = userType;
  return config;
});

privateApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  },
);
