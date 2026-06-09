'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function ErrorBoundary({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations('Errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16'>
      <div className='flex max-w-md flex-col items-center text-center gap-2'>
        <h2 className='text-xl font-semibold text-ink-900'>{t('generic')}</h2>
        <p className='text-sm leading-relaxed text-foggy'>{t('genericSubtitle')}</p>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row'>
        <Button
          type='button'
          onClick={() => unstable_retry()}
          className='h-auto rounded-xl px-6 py-2.5 text-sm font-semibold'
        >
          <RefreshCw className='mr-2 h-4 w-4' />
          {t('tryAgain')}
        </Button>
        <Link
          href='/'
          className={buttonVariants({ variant: 'outline', className: 'h-auto rounded-xl px-6 py-2.5 text-sm font-semibold' })}
        >
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
