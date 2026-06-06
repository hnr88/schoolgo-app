// Shared HTTP helpers for API-level security tests.
//
// Security specs probe the Strapi REST API directly (no browser), so they need a
// stable API base URL and a real JWT per seeded role. The API base URL follows the
// same env-driven reconciliation as the portal URLs (the live stack runs Strapi on
// :1338); override with PLAYWRIGHT_API_URL. Credentials come from creds.ts, which
// sources the seeded e2e logins — they are never invented here.

import type { APIRequestContext } from '@playwright/test';
import { expect } from '@playwright/test';
import type { PortalCreds } from './creds';

const API_HOST = process.env.PLAYWRIGHT_API_HOST ?? 'localhost';
const API_PORT = process.env.PLAYWRIGHT_API_PORT ?? '1338';

export const API_URL = process.env.PLAYWRIGHT_API_URL ?? `http://${API_HOST}:${API_PORT}`;

// Exchange seeded credentials for a JWT via Strapi's local auth endpoint.
export async function loginViaApi(
  request: APIRequestContext,
  creds: PortalCreds,
): Promise<string> {
  const res = await request.post(`${API_URL}/api/auth/local`, {
    data: { identifier: creds.email, password: creds.password },
    headers: { 'Content-Type': 'application/json' },
  });
  expect(res.status(), `login failed for ${creds.email}`).toBe(200);
  const body = (await res.json()) as { jwt?: string };
  expect(typeof body.jwt, `no jwt returned for ${creds.email}`).toBe('string');
  return body.jwt as string;
}

export function authHeaders(jwt: string): Record<string, string> {
  return { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' };
}
