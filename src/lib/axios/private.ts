import axios from 'axios';
import { toast } from 'sonner';
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
      toast.error('Your session has expired. Please sign in again.');
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status === 422) {
      toast.error('Validation failed. Please check your input.');
    } else if (status === 429) {
      toast.error('Too many requests. Please try again shortly.');
    } else if (status && status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (!status) {
      toast.error('Network error. Please check your connection.');
    }

    return Promise.reject(err);
  },
);
