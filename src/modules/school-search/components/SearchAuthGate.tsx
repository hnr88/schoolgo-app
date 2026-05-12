'use client';

import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { SearchAuthGateProps } from '@/modules/school-search/types/component.types';

export function SearchAuthGate({ children }: SearchAuthGateProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated || !isAuthenticated) return null;

  return <>{children}</>;
}
