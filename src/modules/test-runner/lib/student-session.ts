import { isAxiosError } from 'axios';
import { publicApi } from '@/lib/axios';
import type {
  StudentSession,
  StudentSessionError,
  StudentSessionErrorKind,
  VerifyMagicLinkResponse,
} from '@/modules/test-runner/types/student-session.types';

const VERIFY_URL = '/api/auth/student/magic-link/verify';
const ME_URL = '/api/auth/student/me';

function toSessionError(error: unknown): StudentSessionError {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const upstream = error.response?.data as
      | { error?: { name?: string; message?: string } }
      | undefined;
    const message = upstream?.error?.message;

    if (status === 400) {
      return { kind: 'missing_token', message: message ?? 'Token is required' };
    }
    if (status === 401 || status === 403) {
      const kind: StudentSessionErrorKind = /expired/i.test(message ?? '') ? 'expired' : 'invalid_token';
      return { kind, message: message ?? 'This sign-in link is invalid or expired' };
    }
  }
  return { kind: 'unavailable', message: 'Student authentication service is unavailable' };
}

export async function verifyMagicLink(token: string): Promise<VerifyMagicLinkResponse> {
  try {
    const { data } = await publicApi.get<VerifyMagicLinkResponse>(VERIFY_URL, {
      params: { token },
    });
    return data;
  } catch (error) {
    throw toSessionError(error);
  }
}

export async function fetchStudentSession(jwt: string): Promise<StudentSession> {
  try {
    const { data } = await publicApi.get<StudentSession>(ME_URL, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  } catch (error) {
    throw toSessionError(error);
  }
}

export function isStudentSessionError(error: unknown): error is StudentSessionError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'kind' in error &&
    'message' in error
  );
}
