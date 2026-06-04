import { isAxiosError } from 'axios';
import type { ClassifiedAuthError } from '@/modules/auth/types/auth-error.types';

interface StrapiErrorBody {
  error?: { message?: string };
}

function extractStrapiMessage(error: unknown): string {
  if (!isAxiosError(error)) return '';
  const body = error.response?.data as StrapiErrorBody | undefined;
  return body?.error?.message ?? '';
}

function getStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}

export function classifyAuthError(error: unknown): ClassifiedAuthError {
  const status = getStatus(error);
  const message = extractStrapiMessage(error).toLowerCase();

  if (status === 429) {
    return { kind: 'rateLimited', messageKey: 'rateLimited' };
  }

  if (message.includes('blocked') || (status === 403 && message.includes('user'))) {
    return { kind: 'blocked', messageKey: 'accountBlocked' };
  }

  if (message.includes('email') && message.includes('taken')) {
    return { kind: 'emailTaken', messageKey: 'emailTaken', field: 'email' };
  }

  if (message.includes('username') && message.includes('taken')) {
    return { kind: 'usernameTaken', messageKey: 'usernameTaken', field: 'username' };
  }

  if (message.includes('taken')) {
    return { kind: 'emailTaken', messageKey: 'emailTaken', field: 'email' };
  }

  if (status === 400 || status === 401) {
    return { kind: 'invalidCredentials', messageKey: 'invalidCredentials' };
  }

  return { kind: 'generic', messageKey: 'genericError' };
}
