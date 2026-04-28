'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

interface SearchAuthGateProps {
  children: ReactNode;
}

export function SearchAuthGate({ children }: SearchAuthGateProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated || !isAuthenticated) return null;

  return <>{children}</>;
}
