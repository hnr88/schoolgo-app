'use client';

import type { ReactNode } from 'react';
import type { Portal } from '@/lib/portal-url';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/use-redirect-if-authenticated';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

interface AuthRedirectCheckProps {
  portal?: Portal;
  children?: ReactNode;
}

export function AuthRedirectCheck({ portal, children }: AuthRedirectCheckProps) {
  useRedirectIfAuthenticated(portal);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userType = useAuthStore((s) => s.userType);

  if (!children) return null;
  if (isHydrated && isAuthenticated && (!portal || userType === portal)) return null;

  return <>{children}</>;
}
