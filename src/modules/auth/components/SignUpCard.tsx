'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { UserType } from '@/modules/auth/stores/use-auth-store';
import { UserTypeSelector } from '@/modules/auth/components/UserTypeSelector';
import { RegisterForm } from '@/modules/auth/components/RegisterForm';

export function SignUpCard() {
  const t = useTranslations('Auth');
  const [userType, setUserType] = useState<UserType>('parent');

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='flex flex-col items-center gap-6'>
        <Link href='/' aria-label='SchoolGo home'>
          <Image
            src='/logos/logo-black.png'
            alt='SchoolGo'
            width={160}
            height={36}
            className='h-9 w-auto'
          />
        </Link>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='font-display text-2xl font-bold text-ink-900'>{t('signUpTitle')}</h1>
          <p className='text-sm text-foggy'>{t('signUpSubtitle')}</p>
        </div>
      </div>

      <div className='mt-8 rounded-2xl border border-border bg-card p-6 shadow-3 sm:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-medium text-ink-900'>{t('iAmA')}</p>
            <UserTypeSelector value={userType} onChange={setUserType} />
          </div>

          <div className='h-px bg-divider' />

          <RegisterForm userType={userType} />
        </div>
      </div>

      <p className='mt-6 text-center text-sm text-foggy'>
        {t('hasAccount')}{' '}
        <Link href='/sign-in' className='font-medium text-primary hover:underline'>
          {t('signInLink')}
        </Link>
      </p>
    </div>
  );
}
