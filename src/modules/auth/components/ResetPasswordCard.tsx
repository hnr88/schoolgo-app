'use client';

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
    <article className='flex flex-col gap-6'>
      <header className='flex flex-col gap-3'>
        <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl'>
          {t('resetPasswordTitle')}
        </h1>
        <div className={`h-1 w-12 rounded-full ${PORTAL_ACCENT_BAR[portal]}`} aria-hidden='true' />
        <p className='text-sm leading-relaxed text-foggy'>
          {t('resetPasswordSubtitle')}
        </p>
      </header>

      <ResetPasswordForm code={code} />

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
