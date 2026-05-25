'use client';

import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useResetPasswordMutation } from '@/modules/auth/queries/use-reset-password.mutation';
import type { ResetPasswordValues } from '@/modules/auth/schemas/reset-password.schema';

export function useResetPassword() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const mutation = useResetPasswordMutation();

  const handleResetPassword = async (data: ResetPasswordValues) => {
    try {
      await mutation.mutateAsync(data);
      toast.success(t('resetPasswordSuccess'));
      router.push('/sign-in');
    } catch (err) {
      toast.error(t('resetPasswordError'));
      if (process.env.NODE_ENV === 'development') {
        console.error('[useResetPassword]', err);
      }
    }
  };

  return { handleResetPassword, isPending: mutation.isPending };
}
