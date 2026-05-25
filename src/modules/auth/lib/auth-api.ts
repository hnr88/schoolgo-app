import { publicApi } from '@/lib/axios';
import type { StrapiAuthResponse } from '@/modules/auth/types/auth.types';
import type { LoginValues } from '@/modules/auth/schemas/login.schema';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import type { ResetPasswordValues } from '@/modules/auth/schemas/reset-password.schema';

export async function loginRequest(values: LoginValues): Promise<StrapiAuthResponse> {
  const { data } = await publicApi.post<StrapiAuthResponse>('/api/auth/local', values);
  return data;
}

export async function registerRequest(
  values: RegisterValues & { userType?: string },
): Promise<StrapiAuthResponse> {
  const { data } = await publicApi.post<StrapiAuthResponse>('/api/auth/local/register', values);
  return data;
}

export async function forgotPasswordRequest(email: string): Promise<void> {
  await publicApi.post('/api/auth/forgot-password', { email });
}

export async function resetPasswordRequest(values: ResetPasswordValues): Promise<void> {
  await publicApi.post('/api/auth/reset-password', values);
}
