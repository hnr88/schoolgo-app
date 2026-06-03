'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/useRedirectIfAuthenticated';
import { RegisterForm } from '@/modules/auth/components/RegisterForm';
import type { Portal } from '@/lib/portal-url';
import { PORTAL_ACCENT_BAR, PORTAL_LINK_COLOR } from '../constants/portal.constants';

interface SignUpCardProps {
  portal: Portal;
}

export function SignUpCard({ portal }: SignUpCardProps) {
  const t = useTranslations('Auth');
  const { isRedirecting } = useRedirectIfAuthenticated(portal);

  if (isRedirecting) return null;

  return (
    <article className='flex flex-col gap-6'>
      <header className='flex flex-col gap-3'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl'>
          {t(`${portal}.signUpTitle`)}
        </h1>
        <div className={`h-1 w-12 rounded-full ${PORTAL_ACCENT_BAR[portal]}`} aria-hidden='true' />
        <p className='text-sm leading-relaxed text-foggy'>
          {t(`${portal}.signUpSubtitle`)}
        </p>
      </header>

      <RegisterForm userType={portal} />

      <footer className='text-center text-sm text-foggy'>
        {t('hasAccount')}{' '}
        <Link
          href='/sign-in'
          className={`font-semibold underline-offset-4 transition-colors hover:underline ${PORTAL_LINK_COLOR[portal]}`}
        >
          {t('signInLink')}
        </Link>
      </footer>
    </article>
  );
}
