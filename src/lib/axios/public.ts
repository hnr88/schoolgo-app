import axios from 'axios';
import { env } from '@/lib/env';

export const publicApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
