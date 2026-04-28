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
    <div className='absolute inset-x-0 bottom-0 z-10 flex flex-col items-center bg-gradient-to-t from-white via-white/90 to-transparent pb-6 pt-16'>
      <div className='w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-4'>
        <div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
          <Lock className='h-5 w-5 text-primary' />
        </div>
        <h3 className='text-base font-semibold text-ink-900'>{t('title')}</h3>
        <p className='mt-1 text-sm text-foggy'>{t('subtitle')}</p>
        <Link
          href='/sign-in'
          data-slot='button'
          className='mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand'
        >
          {t('signIn')}
        </Link>
      </div>
    </div>
  );
}
