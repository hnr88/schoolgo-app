'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/useRedirectIfAuthenticated';
import { ForgotPasswordForm } from '@/modules/auth/components/ForgotPasswordForm';
import type { Portal } from '@/lib/portal-url';
import { PORTAL_ACCENT_BAR, PORTAL_LINK_COLOR } from '../constants/portal.constants';

interface ForgotPasswordCardProps {
  portal: Portal;
}

export function ForgotPasswordCard({ portal }: ForgotPasswordCardProps) {
  const t = useTranslations('Auth');
  const { isRedirecting } = useRedirectIfAuthenticated(portal);

  if (isRedirecting) return null;

  return (
    <article className='flex flex-col gap-6'>
      <header className='flex flex-col gap-3'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl'>
          {t('forgotPasswordTitle')}
        </h1>
        <div className={`h-1 w-12 rounded-full ${PORTAL_ACCENT_BAR[portal]}`} aria-hidden='true' />
        <p className='text-sm leading-relaxed text-foggy'>
          {t('forgotPasswordSubtitle')}
        </p>
      </header>

      <ForgotPasswordForm portal={portal} />

      <footer className='text-center text-sm text-foggy'>
        <Link
          href='/sign-in'
          className={`font-semibold underline-offset-4 transition-colors hover:underline ${PORTAL_LINK_COLOR[portal]}`}
        >
          {t('backToSignIn')}
        </Link>
      </footer>
    </article>
  );
}
