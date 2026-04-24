'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { registerRequest } from '@/modules/auth/lib/auth-api';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import type { Portal } from '@/lib/portal-url';

interface UseRegisterOptions {
  portal: Portal;
}

export function useRegister({ portal }: UseRegisterOptions) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const setUserType = useAuthStore((s) => s.setUserType);
  const login = useAuthStore((s) => s.login);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (data: RegisterValues) => {
    try {
      setIsSubmitting(true);
      await registerRequest({ ...data, userType: portal });
      await login({ identifier: data.email, password: data.password });
      setUserType(portal);
      toast.success(t('registerSuccess'));
      router.push(getPortalDashboardPath(portal));
    } catch {
      toast.error(t('registerError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleRegister, isSubmitting };
}
