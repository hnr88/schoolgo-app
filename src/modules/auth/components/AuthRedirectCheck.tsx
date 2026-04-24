'use client';

import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/use-redirect-if-authenticated';

export function AuthRedirectCheck() {
  useRedirectIfAuthenticated();
  return null;
}
