'use client';

import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

export function SearchLoginPrompt() {
  const t = useTranslations('SchoolSearch.loginPrompt');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated || isAuthenticated) return null;

  return (
    <div className='absolute inset-x-0 bottom-0 z-10 flex flex-col items-center bg-gradient-to-t from-background via-background/90 to-transparent pb-6 pt-16'>
      <div className='w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-3'>
        <div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rausch-50'>
          <Lock className='h-5 w-5 text-primary' aria-hidden='true' />
        </div>
        <h3 className='font-display text-base font-semibold tracking-tight text-ink-900'>{t('title')}</h3>
        <p className='mt-1 text-sm text-foggy'>{t('subtitle')}</p>
        <div className='mt-4 flex w-full items-center gap-2'>
          <Link
            href='/sign-up'
            data-slot='button'
            className='inline-flex flex-1 items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            {t('signUp')}
          </Link>
          <Link
            href='/sign-in'
            data-slot='button'
            className='inline-flex flex-1 items-center justify-center rounded-md px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
