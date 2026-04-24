'use client';

import type { ReactNode } from 'react';
import { useRequireAuth } from '@/modules/auth/hooks/use-require-auth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, isInitialized } = useRequireAuth();

  if (!isInitialized) {
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

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
