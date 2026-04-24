'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';

export function useRedirectIfAuthenticated() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const userType = useAuthStore((s) => s.userType);

  useEffect(() => {
    if (isInitialized && isAuthenticated && userType) {
      router.replace(getPortalDashboardPath(userType));
    }
  }, [isInitialized, isAuthenticated, userType, router]);

  return { isRedirecting: isInitialized && isAuthenticated };
}
