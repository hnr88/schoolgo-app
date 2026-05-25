'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import { portalUrl } from '@/lib/portal-url';
import type { Portal } from '@/lib/portal-url';
import type { UserRole } from '@/modules/auth/types/auth.types';

interface UseRequireAuthOptions {
  allowedRoles?: UserRole[];
  redirectTo?: string;
  portal?: Portal;
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const router = useRouter();
  const locale = useLocale();
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
      const path = getPortalDashboardPath(portal);
      if (path) {
        window.location.href = `${portalUrl(portal, locale)}${path}`;
      }
    }
  }, [isAuthenticated, isInitialized, user?.role, allowedRoles, loginPath, router, userType, locale]);

  return { isAuthenticated, user, isLoading, isInitialized };
}
