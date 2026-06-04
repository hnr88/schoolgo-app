'use client';

import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SchoolSettingsFormError({ message }: { message: string }) {
  const t = useTranslations('SchoolSettings');

  return (
    <div
      role='alert'
      className='flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3'
    >
      <AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-destructive' aria-hidden='true' />
      <div className='flex flex-col gap-0.5'>
        <p className='text-sm font-semibold text-destructive'>{t('formErrorTitle')}</p>
        <p className='text-sm text-foreground'>{message}</p>
      </div>
    </div>
  );
}
