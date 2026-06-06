import { getTranslations } from 'next-intl/server';
import { ShieldCheck } from 'lucide-react';
import { DsButton, Eyebrow } from '@/modules/design-system';

export async function PaymentsPromoCard() {
  const t = await getTranslations('ParentPayments');

  return (
    <section className='flex flex-col gap-6 rounded-2xl bg-ink-900 p-6 shadow-2 md:flex-row md:items-center md:justify-between md:p-8'>
      <div className='flex flex-col gap-2'>
        <Eyebrow className='text-background/60'>{t('promo.eyebrow')}</Eyebrow>
        <h2 className='font-display text-xl font-bold tracking-tight text-background sm:text-2xl'>
          {t('promo.title')}
        </h2>
        <p className='flex max-w-xl items-start gap-2 text-sm leading-relaxed text-background/70'>
          <ShieldCheck className='mt-0.5 h-4 w-4 shrink-0' strokeWidth={1.75} aria-hidden='true' />
          {t('promo.description')}
        </p>
      </div>
      <DsButton variant='primary' size='lg' disabled>
        {t('promo.cta')}
      </DsButton>
    </section>
  );
}
