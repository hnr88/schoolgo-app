'use client';

import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import type { UseFormSetError } from 'react-hook-form';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { registerRequest } from '@/modules/auth/lib/auth-api';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import { getPortalFromRole } from '@/modules/auth/lib/get-portal-from-role';
import { classifyAuthError } from '@/modules/auth/lib/classify-auth-error';
import { env } from '@/lib/env';
import { portalUrl, type Portal } from '@/lib/portal-url';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import type { RegisterRequestPayload } from '@/modules/auth/types/auth-api.types';

const ONBOARDING_ROLE_TITLE_KEY = 'schoolgo:onboarding-role-title';

interface UseRegisterOptions {
  portal: Portal;
  setError?: UseFormSetError<RegisterValues>;
}

function buildRegisterBody(data: RegisterValues, portal: Portal): RegisterRequestPayload {
  const body: RegisterRequestPayload = {
    username: data.username,
    email: data.email,
    password: data.password,
    userType: portal,
  };

  if (portal === 'agent') {
    if (data.agencyName) body.agencyName = data.agencyName;
    if (data.countryOfOperation) body.countryOfOperation = data.countryOfOperation;
    if (data.phone) body.phone = data.phone;
  }

  return body;
}

export function useRegister({ portal, setError }: UseRegisterOptions) {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const setUserType = useAuthStore((s) => s.setUserType);
  const login = useAuthStore((s) => s.login);

  const handleRegister = async (data: RegisterValues) => {
    try {
      await registerRequest(buildRegisterBody(data, portal));
      await login({ identifier: data.email, password: data.password });

      const actualUser = useAuthStore.getState().user;
      const actualRole = actualUser?.role;
      const actualPortal = actualRole ? getPortalFromRole(actualRole) : portal;

      setUserType(actualPortal);
      toast.success(t('registerSuccess'));

      if (portal === 'school') {
        if (typeof data.roleTitle === 'string' && data.roleTitle.trim() && typeof window !== 'undefined') {
          sessionStorage.setItem(ONBOARDING_ROLE_TITLE_KEY, data.roleTitle.trim());
        }
        window.location.href = `${portalUrl('school', locale)}/onboarding`;
        return;
      }

      const dashboardPath = getPortalDashboardPath(actualPortal);
      if (dashboardPath) {
        window.location.href = `${portalUrl(actualPortal, locale)}${dashboardPath}`;
      }
    } catch (err) {
      const classified = classifyAuthError(err);
      const message = t(classified.messageKey);
      if (setError) {
        if (classified.field === 'email' || classified.field === 'username') {
          setError(classified.field, { type: 'server', message });
        } else {
          setError('root', { type: 'server', message });
        }
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
