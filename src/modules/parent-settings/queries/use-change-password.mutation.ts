'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import type { PasswordValues } from '@/modules/parent-settings/schemas/password.schema';
import type { ChangePasswordResponse } from '@/modules/parent-settings/types/parent-settings.types';

export function useChangePassword() {
  const t = useTranslations('ParentSettings');
  const setJwt = useAuthStore((s) => s.setJwt);

  return useMutation({
    mutationFn: async (values: PasswordValues) => {
      const { data } = await privateApi.post<ChangePasswordResponse>(
        '/api/auth/change-password',
        {
          currentPassword: values.currentPassword,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        },
      );
      return data;
    },
    onSuccess: (data) => {
      setJwt(data.jwt);
      toast.success(t('passwordSuccess'));
    },
    onError: () => {
      toast.error(t('passwordError'));
    },
  });
}
