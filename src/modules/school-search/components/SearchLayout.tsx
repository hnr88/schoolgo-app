'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';

interface SearchLayoutProps {
  children: ReactNode;
}

export function SearchLayout({ children }: SearchLayoutProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const isGuest = isHydrated && !isAuthenticated;

  return (
    <main
      className={cn(
        'flex pt-16 md:pt-20',
        isGuest ? 'mx-auto w-full max-w-content px-6' : 'w-full',
      )}
    >
      {children}
    </main>
  );
}
