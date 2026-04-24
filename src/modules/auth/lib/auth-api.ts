import { publicApi } from '@/lib/axios';
import type { StrapiAuthResponse } from '@/modules/auth/types/auth.types';
import type { LoginValues } from '@/modules/auth/schemas/login.schema';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';

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
