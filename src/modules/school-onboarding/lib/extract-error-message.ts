import { isAxiosError } from 'axios';

export function extractErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.error?.message;
    if (typeof message === 'string' && message.length > 0) return message;
  }
  return fallback;
}
