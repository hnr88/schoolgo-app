'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import type { LoginValues } from '@/modules/auth/schemas/login.schema';

interface UseLoginOptions {
  portal: Portal;
}

export function useLogin({ portal }: UseLoginOptions) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const login = useAuthStore((s) => s.login);
  const setUserType = useAuthStore((s) => s.setUserType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (data: LoginValues) => {
    try {
      setIsSubmitting(true);
      await login(data);

      setUserType(portal);
      toast.success(t('loginSuccess'));
      const dashboardPath = getPortalDashboardPath(portal);
      if (dashboardPath) {
        window.location.href = `${portalUrl(portal, locale)}${dashboardPath}`;
      }
    } catch {
      toast.error(t('loginError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleLogin, isSubmitting };
}
