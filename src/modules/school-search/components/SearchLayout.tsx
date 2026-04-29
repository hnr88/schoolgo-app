'use client';

import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';
import type { SearchLayoutProps } from '@/modules/school-search/types/component.types';

export function SearchLayout({ children }: SearchLayoutProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  const isGuest = isHydrated && !isAuthenticated;

  return (
    <main
      className={cn(
        'flex pt-16 md:pt-30',
        isGuest ? 'mx-auto w-full max-w-content px-6' : 'w-full',
      )}
    >
      {children}
    </main>
  );
}
