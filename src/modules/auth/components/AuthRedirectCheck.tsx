'use client';

import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/use-redirect-if-authenticated';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { AuthRedirectCheckProps } from '@/modules/auth/types/component.types';

export function AuthRedirectCheck({ portal, children }: AuthRedirectCheckProps) {
  useRedirectIfAuthenticated(portal);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userType = useAuthStore((s) => s.userType);

  if (!children) return null;
  if (isHydrated && isAuthenticated && (!portal || userType === portal)) return null;

  return <>{children}</>;
}
