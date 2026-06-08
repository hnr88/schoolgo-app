'use client';

import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import type { UseFormSetError } from 'react-hook-form';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { env } from '@/lib/env';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import { getPortalFromRole } from '@/modules/auth/lib/get-portal-from-role';
import { classifyAuthError } from '@/modules/auth/lib/classify-auth-error';
import type { LoginValues } from '@/modules/auth/schemas/login.schema';

interface UseLoginOptions {
  portal: Portal;
  setError?: UseFormSetError<LoginValues>;
}

export function useLogin({ portal, setError }: UseLoginOptions) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const login = useAuthStore((s) => s.login);
  const setUserType = useAuthStore((s) => s.setUserType);

  const handleLogin = async (data: LoginValues) => {
    try {
      await login(data);

      const actualUser = useAuthStore.getState().user;
      const actualRole = actualUser?.role;
      const actualPortal = actualRole ? getPortalFromRole(actualRole) : portal;

      // The session lives in per-origin localStorage + a host-only cookie, so it
      // cannot follow a cross-subdomain redirect. If this account belongs to a
      // different portal than the one being signed into, redirecting to that
      // portal's dashboard would arrive with no session and bounce back to its
      // sign-in. Surface the "not authorised for this portal" message and clear
      // the wrong-origin session instead of stranding the user.
      if (actualPortal !== portal) {
        useAuthStore.getState().logout();
        const message = t('portalUnauthorized');
        if (setError) {
          setError('root', { type: 'server', message });
        } else {
          toast.error(message);
        }
        return;
      }

      setUserType(actualPortal);
      toast.success(t('loginSuccess'));
      const dashboardPath = getPortalDashboardPath(actualPortal);
      if (dashboardPath) {
        window.location.href = `${portalUrl(actualPortal, locale)}${dashboardPath}`;
      }
    } catch (err) {
      const classified = classifyAuthError(err);
      const message = t(classified.messageKey);
      if (setError) {
        setError('root', { type: 'server', message });
      } else {
        toast.error(message);
      }
      if (env.NODE_ENV === 'development') {
        console.error('[useLogin]', err);
      }
    }
  };

  return { handleLogin };
}
