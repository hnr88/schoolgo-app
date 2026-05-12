'use client';

import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import type { UseFormSetError } from 'react-hook-form';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { registerRequest } from '@/modules/auth/lib/auth-api';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import type { Portal } from '@/lib/portal-url';

interface UseRegisterOptions {
  portal: Portal;
  setError?: UseFormSetError<RegisterValues>;
}

export function useRegister({ portal, setError }: UseRegisterOptions) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const setUserType = useAuthStore((s) => s.setUserType);
  const login = useAuthStore((s) => s.login);

  const handleRegister = async (data: RegisterValues) => {
    try {
      await registerRequest({ ...data, userType: portal });
      await login({ identifier: data.email, password: data.password });
      setUserType(portal);
      toast.success(t('registerSuccess'));
      const dashboardPath = getPortalDashboardPath(portal);
      if (dashboardPath) router.push(dashboardPath);
    } catch (err) {
      const message = t('registerError');
      if (setError) {
        setError('root', { type: 'server', message });
      } else {
        toast.error(message);
      }
      if (process.env.NODE_ENV === 'development') {
        console.error('[useRegister]', err);
      }
    }
  };

  return { handleRegister };
}
