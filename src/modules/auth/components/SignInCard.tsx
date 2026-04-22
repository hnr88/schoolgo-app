'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import { LoginForm } from '@/modules/auth/components/LoginForm';

interface SignInCardProps {
  portal: Portal;
}

const PORTAL_ACCENT_BAR: Record<Portal, string> = {
  parent: 'bg-rausch-400',
  agent: 'bg-babu-500',
  school: 'bg-arches-400',
};

const PORTAL_LOGO_BG: Record<Portal, string> = {
  parent: 'bg-rausch-50',
  agent: 'bg-babu-50',
  school: 'bg-arches-50',
};

const PORTAL_LINK_COLOR: Record<Portal, string> = {
  parent: 'text-rausch-500 hover:text-rausch-600',
  agent: 'text-babu-600 hover:text-babu-700',
  school: 'text-arches-500 hover:text-arches-600',
};

export function SignInCard({ portal }: SignInCardProps) {
  const t = useTranslations('Auth');

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

      <div className='mt-8 rounded-2xl border border-border/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8'>
        <LoginForm userType={portal} />
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
