'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

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
    <div className='flex flex-col items-center justify-center min-h-screen gap-4 p-6'>
      <h1 className='text-2xl font-bold text-on-surface'>{t('generic')}</h1>
      <Button type='button' onClick={reset}>
        {t('tryAgain')}
      </Button>
    </div>
  );
}
