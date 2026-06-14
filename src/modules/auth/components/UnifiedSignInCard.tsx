'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useRedirectIfAuthenticated } from '@/modules/auth/hooks/useRedirectIfAuthenticated';
import { UnifiedLoginForm } from '@/modules/auth/components/UnifiedLoginForm';
import type { UnifiedSignInCardProps } from '@/modules/auth/types/unified-login.types';
import { PORTAL_ACCENT_BAR, PORTAL_LINK_COLOR } from '../constants/portal.constants';

export function UnifiedSignInCard({ currentPortal }: UnifiedSignInCardProps) {
  const t = useTranslations('Auth');
  const { isRedirecting } = useRedirectIfAuthenticated(currentPortal);

  if (isRedirecting) return null;

  return (
    <article className='flex flex-col gap-6'>
      <header className='flex flex-col gap-3'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl'>
          {t('signInTitle')}
        </h1>
        <div
          className={`h-1 w-12 rounded-full ${PORTAL_ACCENT_BAR[currentPortal]}`}
          aria-hidden='true'
        />
        <p className='text-sm leading-relaxed text-foggy'>{t('signInSubtitle')}</p>
      </header>

      <UnifiedLoginForm currentPortal={currentPortal} />

      <footer className='text-center text-sm text-foggy'>
        {t('noAccount')}{' '}
        <Link
          href='/sign-up'
          className={`font-semibold underline-offset-4 transition-colors hover:underline ${PORTAL_LINK_COLOR[currentPortal]}`}
        >
          {t('signUp')}
        </Link>
      </footer>
    </article>
  );
}
