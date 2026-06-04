'use client';

import { MailCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ForgotPasswordSentProps {
  email: string;
  cooldown: number;
  isPending: boolean;
  onResend: () => void;
  onUseDifferentEmail: () => void;
  linkColorClass: string;
}

export function ForgotPasswordSent({
  email,
  cooldown,
  isPending,
  onResend,
  onUseDifferentEmail,
  linkColorClass,
}: ForgotPasswordSentProps) {
  const t = useTranslations('Auth');
  const canResend = cooldown === 0 && !isPending;

  return (
    <div className='flex flex-col gap-6' role='status' aria-live='polite'>
      <div className='flex items-start gap-3 rounded-lg border border-vivid-mint-soft bg-vivid-mint-soft p-4'>
        <MailCheck className='mt-0.5 h-5 w-5 shrink-0 text-vivid-mint' aria-hidden='true' />
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-semibold text-ink-900'>{t('forgotPasswordSentTitle')}</p>
          <p className='text-sm leading-relaxed text-foggy'>
            {t('forgotPasswordSentBody', { email })}
          </p>
        </div>
      </div>

      <p className='text-sm leading-relaxed text-foggy'>{t('forgotPasswordSpamHint')}</p>

      <Button
        type='button'
        variant='outline'
        onClick={onResend}
        disabled={!canResend}
        aria-busy={isPending}
        className='h-12 w-full rounded-lg text-base font-semibold'
      >
        {cooldown > 0 ? t('resendCountdown', { seconds: cooldown }) : t('resendLink')}
      </Button>

      <button
        type='button'
        onClick={onUseDifferentEmail}
        className={cn(
          'text-center text-sm font-semibold underline-offset-4 transition-colors hover:underline',
          linkColorClass,
        )}
      >
        {t('useDifferentEmail')}
      </button>
    </div>
  );
}
