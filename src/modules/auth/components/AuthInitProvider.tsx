'use client';

import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { Skeleton } from '@/components/ui/skeleton';
import type { AuthInitProviderProps } from '@/modules/auth/types/component.types';

export function AuthInitProvider({ children }: AuthInitProviderProps) {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  if (!isHydrated || !isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 p-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-4 h-10 w-full" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
