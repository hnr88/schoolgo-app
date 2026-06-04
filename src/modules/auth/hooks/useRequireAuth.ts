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
        const target = `${portalUrl(portal, locale)}${path}`;
        // Never redirect to the page we are already on — that produces an
        // infinite full-page reload loop. Compare by origin + locale-normalised
        // path: the default-locale ('en') target is prefix-less while the proxy
        // leaves the browser on an '/en'-prefixed URL, so a raw startsWith never
        // matches and the guard would fail.
        const targetUrl = new URL(target);
        const here = window.location;
        const stripEn = (p: string) => p.replace(/^\/en(?=\/|$)/, '');
        const alreadyHere =
          here.origin === targetUrl.origin &&
          stripEn(here.pathname) === stripEn(targetUrl.pathname);
        if (!alreadyHere) {
          window.location.href = target;
        }
      }
    }
  }, [isAuthenticated, isInitialized, user?.role, allowedRoles, loginPath, router, userType, locale]);

  return { isAuthenticated, user, isLoading, isInitialized };
}
