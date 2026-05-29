'use client';

import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { env } from '@/lib/env';
import { useForgotPasswordMutation } from '@/modules/auth/queries/use-forgot-password.mutation';

export function useForgotPassword() {
  const t = useTranslations('Auth');
  const mutation = useForgotPasswordMutation();

  const handleForgotPassword = async (email: string) => {
    try {
      await mutation.mutateAsync(email);
      toast.success(t('forgotPasswordSuccess'));
    } catch (err) {
      toast.error(t('forgotPasswordError'));
      if (env.NODE_ENV === 'development') {
        console.error('[useForgotPassword]', err);
      }
    }
  };

  return { handleForgotPassword, isPending: mutation.isPending };
}
