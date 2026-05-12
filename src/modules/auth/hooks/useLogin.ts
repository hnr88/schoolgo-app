'use client';

import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import type { UseFormSetError } from 'react-hook-form';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
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

      setUserType(portal);
      toast.success(t('loginSuccess'));
      const dashboardPath = getPortalDashboardPath(portal);
      if (dashboardPath) {
        window.location.href = `${portalUrl(portal, locale)}${dashboardPath}`;
      }
    } catch (err) {
      const message = t('loginError');
      if (setError) {
        setError('root', { type: 'server', message });
      } else {
        toast.error(message);
      }
      if (process.env.NODE_ENV === 'development') {
        console.error('[useLogin]', err);
      }
    }
  };

  return { handleLogin };
}
