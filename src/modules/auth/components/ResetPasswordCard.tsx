'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/useRedirectIfAuthenticated';
import { ResetPasswordForm } from '@/modules/auth/components/ResetPasswordForm';
import type { Portal } from '@/lib/portal-url';
import { PORTAL_ACCENT_BAR, PORTAL_LINK_COLOR } from '../constants/portal.constants';

interface ResetPasswordCardProps {
  portal: Portal;
  code: string;
}

export function ResetPasswordCard({ portal, code }: ResetPasswordCardProps) {
  const t = useTranslations('Auth');
  const { isRedirecting } = useRedirectIfAuthenticated(portal);

  if (isRedirecting) return null;

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='flex flex-col items-center gap-8'>
        <Link href='/' aria-label='SchoolGo home'>
          <Image
            src='/logos/logo-red.png'
            alt='SchoolGo'
            width={280}
            height={60}
            className='h-20 w-auto'
          />
        </Link>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='font-display text-3xl font-bold tracking-tight text-ink-900'>
            {t('resetPasswordTitle')}
          </h1>
          <div className={`h-0.5 w-12 rounded-full ${PORTAL_ACCENT_BAR[portal]}`} />
          <p className='mt-1 max-w-xs text-sm leading-relaxed text-foggy'>
            {t('resetPasswordSubtitle')}
          </p>
        </div>
      </div>

      <div className='mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-3'>
        <div className='p-6 sm:p-8'>
          <ResetPasswordForm code={code} />
        </div>
      </div>

      <p className='mt-8 text-center text-sm text-foggy'>
        <Link
          href='/sign-in'
          className={`font-semibold underline-offset-4 hover:underline ${PORTAL_LINK_COLOR[portal]}`}
        >
          {t('backToSignIn')}
        </Link>
      </p>
    </div>
  );
}
