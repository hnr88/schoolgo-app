'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/modules/auth/hooks/use-auth';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import type { Portal } from '@/lib/portal-url';
import type { UserRole } from '@/modules/auth/types/auth.types';

interface UseRequireAuthOptions {
  allowedRoles?: UserRole[];
  redirectTo?: string;
  portal?: Portal;
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, isInitialized, userType } = useAuth();
  const { allowedRoles, redirectTo } = options;
  const loginPath = redirectTo ?? '/sign-in';

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.push(loginPath);
      return;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
      const portal = userType ?? 'parent';
      router.push(getPortalDashboardPath(portal));
    }
  }, [isAuthenticated, isInitialized, user?.role, allowedRoles, loginPath, router, userType]);

  return { isAuthenticated, user, isLoading, isInitialized };
}
