'use client';

import { PUBLIC_ONLY } from '@/lib/deliverable-config';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/useRedirectIfAuthenticated';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { AuthRedirectCheckProps } from '@/modules/auth/types/component.types';

export function AuthRedirectCheck({ portal, children }: AuthRedirectCheckProps) {
  useRedirectIfAuthenticated(portal);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userType = useAuthStore((s) => s.userType);

  if (!children) return null;
  // Public-only deliverable: landings are always public, never bounce or blank
  // out on a stale localStorage session.
  if (PUBLIC_ONLY) return <>{children}</>;
  if (isHydrated && isAuthenticated && (!portal || userType === portal)) return null;

  return <>{children}</>;
}
