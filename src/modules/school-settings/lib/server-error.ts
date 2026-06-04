import { isAxiosError } from 'axios';

export interface SchoolServerError {
  status?: number;
  message?: string;
}

export function getSchoolServerError(error: unknown): SchoolServerError {
  if (!isAxiosError(error)) {
    return {};
  }
  const status = error.response?.status;
  const message = error.response?.data?.error?.message as string | undefined;
  return { status, message };
}
