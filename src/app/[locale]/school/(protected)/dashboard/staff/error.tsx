'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations('SchoolStaff');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
      <h2 className='text-lg font-semibold text-ink-900'>{t('loadError')}</h2>
      <Button
        type='button'
        onClick={() => unstable_retry()}
        className='rounded-xl px-6 py-2.5 text-sm font-semibold'
      >
        <RefreshCw className='mr-2 h-4 w-4' />
        {t('retry')}
      </Button>
    </div>
  );
}
