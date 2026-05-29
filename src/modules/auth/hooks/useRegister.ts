'use client';

import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import type { UseFormSetError } from 'react-hook-form';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { registerRequest } from '@/modules/auth/lib/auth-api';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import { getPortalFromRole } from '@/modules/auth/lib/get-portal-from-role';
import { env } from '@/lib/env';
import { portalUrl, type Portal } from '@/lib/portal-url';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';

interface UseRegisterOptions {
  portal: Portal;
  setError?: UseFormSetError<RegisterValues>;
}

export function useRegister({ portal, setError }: UseRegisterOptions) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const setUserType = useAuthStore((s) => s.setUserType);
  const login = useAuthStore((s) => s.login);

  const handleRegister = async (data: RegisterValues) => {
    try {
      await registerRequest({ ...data, userType: portal });
      await login({ identifier: data.email, password: data.password });

      const actualUser = useAuthStore.getState().user;
      const actualRole = actualUser?.role;
      const actualPortal = actualRole ? getPortalFromRole(actualRole) : portal;

      setUserType(actualPortal);
      toast.success(t('registerSuccess'));
      const dashboardPath = getPortalDashboardPath(actualPortal);
      if (dashboardPath) {
        window.location.href = `${portalUrl(actualPortal, locale)}${dashboardPath}`;
      }
    } catch (err) {
      const message = t('registerError');
      if (setError) {
        setError('root', { type: 'server', message });
      } else {
        toast.error(message);
      }
      if (env.NODE_ENV === 'development') {
        console.error('[useRegister]', err);
      }
    }
  };

  return { handleRegister };
}
