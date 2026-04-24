'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';

export function useRedirectIfAuthenticated(currentPortal?: Portal) {
  const locale = useLocale();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const userType = useAuthStore((s) => s.userType);

  const dashboardPath = userType ? getPortalDashboardPath(userType) : null;

  const shouldRedirect =
    isInitialized &&
    isAuthenticated &&
    !!userType &&
    !!dashboardPath &&
    (!currentPortal || userType === currentPortal);

  useEffect(() => {
    if (shouldRedirect && userType && dashboardPath) {
      window.location.href = `${portalUrl(userType, locale)}${dashboardPath}`;
    }
  }, [shouldRedirect, userType, dashboardPath, locale]);

  return { isRedirecting: shouldRedirect };
}
