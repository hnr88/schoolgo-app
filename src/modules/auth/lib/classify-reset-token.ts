import { isAxiosError } from 'axios';

export type ResetTokenError = 'missing' | 'invalid' | 'expired';

interface StrapiErrorBody {
  error?: { message?: string };
}

export function isMissingResetToken(code: string | undefined | null): boolean {
  return !code || code.trim().length === 0;
}

export function classifyResetTokenError(error: unknown): ResetTokenError | null {
  if (!isAxiosError(error)) return null;
  const status = error.response?.status;
  const body = error.response?.data as StrapiErrorBody | undefined;
  const message = (body?.error?.message ?? '').toLowerCase();

  if (message.includes('expire')) return 'expired';
  if (status === 400 && (message.includes('code') || message.includes('token'))) {
    return 'invalid';
  }
  return null;
}
