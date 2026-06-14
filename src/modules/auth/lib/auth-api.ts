import { publicApi } from '@/lib/axios';
import type { StrapiAuthResponse } from '@/modules/auth/types/auth.types';
import type { LoginValues } from '@/modules/auth/schemas/login.schema';
import type { ResetPasswordValues } from '@/modules/auth/schemas/reset-password.schema';
import type {
  IdentifyResponse,
  RegisterRequestPayload,
} from '@/modules/auth/types/auth-api.types';

export async function loginRequest(values: LoginValues): Promise<StrapiAuthResponse> {
  const { data } = await publicApi.post<StrapiAuthResponse>('/api/auth/local', values);
  return data;
}

export async function identifyRequest(email: string): Promise<IdentifyResponse> {
  const { data } = await publicApi.post<IdentifyResponse>('/api/auth/identify', { email });
  return data;
}

export async function registerRequest(
  values: RegisterRequestPayload,
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
