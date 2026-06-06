import { getTranslations } from 'next-intl/server';
import { CreditCard } from 'lucide-react';
import { DsButton } from '@/modules/design-system';

export async function PaymentsHeader() {
  const t = await getTranslations('ParentPayments');

  return (
    <div className='flex flex-wrap items-start justify-between gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap items-center gap-3'>
          <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl'>
            {t('title')}
          </h1>
          <span className='inline-flex items-center gap-1.5 rounded-pill bg-rausch-50 px-2.5 py-1 text-xs font-semibold text-primary-strong'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' aria-hidden='true' />
            {t('comingSoon')}
          </span>
        </div>
        <p className='max-w-xl text-sm text-foggy'>{t('subtitle')}</p>
      </div>
      <DsButton variant='secondary' size='md' disabled>
        <CreditCard className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
        {t('manageMethods')}
      </DsButton>
    </div>
  );
}
