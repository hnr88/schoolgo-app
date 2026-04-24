'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import { PORTAL_ALLOWED_ROLES } from '@/modules/auth/constants/auth.constants';
import type { LoginValues } from '@/modules/auth/schemas/login.schema';
import type { Portal } from '@/lib/portal-url';

interface UseLoginOptions {
  portal: Portal;
}

export function useLogin({ portal }: UseLoginOptions) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const setUserType = useAuthStore((s) => s.setUserType);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (data: LoginValues) => {
    try {
      setIsSubmitting(true);
      await login(data);

      const role = useAuthStore.getState().user?.role;
      if (!role) {
        toast.error(t('loginError'));
        return;
      }

      const allowedRoles = PORTAL_ALLOWED_ROLES[portal];
      if (!allowedRoles.has(role)) {
        logout();
        toast.error(t('portalUnauthorized'));
        return;
      }

      setUserType(portal);
      toast.success(t('loginSuccess'));
      router.push(getPortalDashboardPath(portal));
    } catch {
      toast.error(t('loginError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleLogin, isSubmitting };
}
