'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute inset-0 bg-gradient-to-br from-rausch-50/40 via-white to-babu-50/20' />
        <div className='absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-rausch-200 opacity-20 blur-[160px]' />
        <div className='absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-babu-100 opacity-25 blur-[140px]' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.04]'>
          <defs>
            <pattern id='err-dots' width='32' height='32' patternUnits='userSpaceOnUse'>
              <circle cx='2' cy='2' r='1' fill='currentColor' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#err-dots)' />
        </svg>
      </div>

      <div className='relative flex max-w-lg flex-col items-center text-center'>
        <Link href='/' className='mb-10' aria-label='SchoolGo home'>
          <Image
            src='/logos/logo-red.png'
            alt='SchoolGo'
            width={160}
            height={36}
            className='h-9 w-auto'
          />
        </Link>

        <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-rausch-50'>
          <svg width='40' height='40' viewBox='0 0 40 40' fill='none' aria-hidden='true'>
            <circle cx='20' cy='20' r='18' stroke='oklch(0.685 0.188 18)' strokeWidth='2.5' strokeDasharray='6 4' />
            <path d='M20 12v10' stroke='oklch(0.685 0.188 18)' strokeWidth='2.5' strokeLinecap='round' />
            <circle cx='20' cy='27' r='1.5' fill='oklch(0.685 0.188 18)' />
          </svg>
        </div>

        <h1 className='font-display text-3xl font-bold text-ink-900 sm:text-4xl'>
          {t('generic')}
        </h1>
        <p className='mt-3 text-base leading-relaxed text-foggy'>
          {t('genericSubtitle')}
        </p>

        <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
          <Button
            type='button'
            onClick={reset}
            className='h-auto rounded-xl px-8 py-3 text-sm font-semibold shadow-brand'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            {t('tryAgain')}
          </Button>
          <Link
            href='/'
            className={buttonVariants({ variant: 'outline', className: 'h-auto rounded-xl px-8 py-3 text-sm font-semibold' })}
          >
            {t('goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
