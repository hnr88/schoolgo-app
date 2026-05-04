'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/use-redirect-if-authenticated';
import { LoginForm } from '@/modules/auth/components/LoginForm';
import type { SignInCardProps } from '@/modules/auth/types/component.types';
import { PORTAL_ACCENT_BAR, PORTAL_LINK_COLOR } from '../constants/portal.constants';

export function SignInCard({ portal }: SignInCardProps) {
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
            {t(`${portal}.signInTitle`)}
          </h1>
          <div className={`h-0.5 w-12 rounded-full ${PORTAL_ACCENT_BAR[portal]}`} />
          <p className='mt-1 max-w-xs text-sm leading-relaxed text-foggy'>
            {t(`${portal}.signInSubtitle`)}
          </p>
        </div>
      </div>

      <div className='mt-8 overflow-hidden rounded-2xl border border-border/60 bg-white/80 shadow-lg'>
        <div className='p-6 sm:p-8'>
          <LoginForm userType={portal} />
        </div>
      </div>

      <p className='mt-8 text-center text-sm text-foggy'>
        {t('noAccount')}{' '}
        <Link
          href='/sign-up'
          className={`font-semibold underline-offset-4 hover:underline ${PORTAL_LINK_COLOR[portal]}`}
        >
          {t('signUp')}
        </Link>
      </p>
    </div>
  );
}
