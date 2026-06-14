import type { Portal } from '@/lib/portal-url';

export interface RegisterRequestPayload {
  username: string;
  email: string;
  password: string;
  userType?: string;
  agencyName?: string;
  countryOfOperation?: string;
  phone?: string;
}

export interface IdentifyResponse {
  exists: boolean;
  portal: Portal | null;
  role: string | null;
}
