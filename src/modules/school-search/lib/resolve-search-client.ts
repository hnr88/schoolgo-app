import type { AxiosInstance } from 'axios';
import { publicApi, privateApi } from '@/lib/axios';

export function resolveSearchClient(jwt: string | null): AxiosInstance {
  return jwt ? privateApi : publicApi;
}
