'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import { SchoolPasswordForm } from '@/modules/school-settings/components/SchoolPasswordForm';

export function SchoolSecuritySection() {
  const t = useTranslations('SchoolSettings');

  return (
    <div className='flex flex-col gap-8'>
      <section className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-sm font-medium text-ink-900'>{t('passwordSectionTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('passwordSectionDescription')}</p>
        </div>
        <SchoolPasswordForm />
      </section>

      <Separator />

      <section className='flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-sm font-medium text-destructive'>{t('dangerTitle')}</h2>
          <p className='text-sm text-muted-foreground'>{t('dangerDescription')}</p>
        </div>
        <p className='text-sm text-muted-foreground'>{t('deleteBlocked')}</p>
      </section>
    </div>
  );
}
