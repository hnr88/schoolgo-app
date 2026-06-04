'use client';

import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import type { UseFormSetError } from 'react-hook-form';
import { useRouter } from '@/i18n/navigation';
import { env } from '@/lib/env';
import { useResetPasswordMutation } from '@/modules/auth/queries/use-reset-password.mutation';
import { classifyResetTokenError, type ResetTokenError } from '@/modules/auth/lib/classify-reset-token';
import { classifyAuthError } from '@/modules/auth/lib/classify-auth-error';
import type { ResetPasswordValues } from '@/modules/auth/schemas/reset-password.schema';

interface UseResetPasswordOptions {
  setError?: UseFormSetError<ResetPasswordValues>;
  onTokenError?: (kind: ResetTokenError) => void;
}

export function useResetPassword({ setError, onTokenError }: UseResetPasswordOptions = {}) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const mutation = useResetPasswordMutation();

  const handleResetPassword = async (data: ResetPasswordValues) => {
    try {
      await mutation.mutateAsync(data);
      toast.success(t('resetPasswordSuccess'));
      router.push('/sign-in');
    } catch (err) {
      const tokenError = classifyResetTokenError(err);
      if (tokenError) {
        onTokenError?.(tokenError);
        return;
      }
      const message = t(classifyAuthError(err).messageKey);
      if (setError) {
        setError('root', { type: 'server', message });
      } else {
        toast.error(message);
      }
      if (env.NODE_ENV === 'development') {
        console.error('[useResetPassword]', err);
      }
    }
  };

  return { handleResetPassword, isPending: mutation.isPending };
}
