'use client';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { ResetTokenError as ResetTokenErrorKind } from '@/modules/auth/lib/classify-reset-token';

interface ResetTokenErrorProps {
  kind: ResetTokenErrorKind;
}

const TITLE_KEY: Record<ResetTokenErrorKind, string> = {
  missing: 'resetTokenInvalidTitle',
  invalid: 'resetTokenInvalidTitle',
  expired: 'resetTokenExpiredTitle',
};

const BODY_KEY: Record<ResetTokenErrorKind, string> = {
  missing: 'resetTokenInvalidBody',
  invalid: 'resetTokenInvalidBody',
  expired: 'resetTokenExpiredBody',
};

export function ResetTokenError({ kind }: ResetTokenErrorProps) {
  const t = useTranslations('Auth');

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4'>
        <AlertTriangle className='mt-0.5 h-5 w-5 shrink-0 text-destructive' aria-hidden='true' />
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-semibold text-ink-900'>{t(TITLE_KEY[kind])}</p>
          <p className='text-sm leading-relaxed text-foggy'>{t(BODY_KEY[kind])}</p>
        </div>
      </div>

      <Link
        href='/forgot-password'
        className={cn(buttonVariants({ variant: 'default' }), 'h-12 w-full rounded-lg text-base font-semibold')}
      >
        {t('requestNewLink')}
      </Link>
    </div>
  );
}
