'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { env } from '@/lib/env';
import { useForgotPasswordMutation } from '@/modules/auth/queries/use-forgot-password.mutation';
import { classifyAuthError } from '@/modules/auth/lib/classify-auth-error';
import { FORGOT_PASSWORD_RESEND_COOLDOWN_SECONDS } from '@/modules/auth/constants/auth.constants';

export function useForgotPassword() {
  const t = useTranslations('Auth');
  const mutation = useForgotPasswordMutation();
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCooldown = useCallback(() => {
    setCooldown(FORGOT_PASSWORD_RESEND_COOLDOWN_SECONDS);
    clearTimer();
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  const sendReset = useCallback(
    async (email: string, isResend: boolean) => {
      try {
        await mutation.mutateAsync(email);
        setSentEmail(email);
        startCooldown();
        if (isResend) {
          toast.success(t('resentToast'));
        }
      } catch (err) {
        toast.error(t(classifyAuthError(err).messageKey));
        if (env.NODE_ENV === 'development') {
          console.error('[useForgotPassword]', err);
        }
      }
    },
    [mutation, startCooldown, t],
  );

  const handleForgotPassword = useCallback(
    (email: string) => sendReset(email, false),
    [sendReset],
  );

  const handleResend = useCallback(() => {
    if (sentEmail && cooldown === 0) {
      void sendReset(sentEmail, true);
    }
  }, [sentEmail, cooldown, sendReset]);

  const reset = useCallback(() => {
    setSentEmail(null);
    setCooldown(0);
    clearTimer();
  }, [clearTimer]);

  return {
    handleForgotPassword,
    handleResend,
    reset,
    sentEmail,
    cooldown,
    isPending: mutation.isPending,
  };
}
