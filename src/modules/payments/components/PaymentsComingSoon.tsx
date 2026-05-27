import { getTranslations } from 'next-intl/server';
import { CreditCard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PAYMENT_PLAN_CARDS } from '@/modules/payments/constants/payments.constants';

export async function PaymentsComingSoon() {
  const t = await getTranslations('ParentPayments');

  return (
    <section className='flex flex-col gap-8'>
      <div className='flex flex-col items-center rounded-lg border border-border bg-card px-6 py-12 text-center shadow-1 sm:px-8'>
        <span className='flex h-14 w-14 items-center justify-center rounded-xl bg-vivid-iris-soft text-vivid-iris'>
          <CreditCard className='h-7 w-7' strokeWidth={1.75} aria-hidden='true' />
        </span>
        <span className='mt-6 inline-flex items-center gap-2 rounded-pill bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foggy'>
          <Sparkles className='h-3.5 w-3.5 text-vivid-iris' aria-hidden='true' />
          {t('badge')}
        </span>
        <h2 className='mt-4 max-w-xl font-display text-2xl font-bold text-ink-900 sm:text-3xl'>
          {t('heading')}
        </h2>
        <p className='mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground'>
          {t('description')}
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-base font-semibold text-ink-900'>{t('plansTitle')}</h3>
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {PAYMENT_PLAN_CARDS.map(({ icon: Icon, nameKey, priceKey, descriptionKey, bg, color }) => (
            <li
              key={nameKey}
              className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-1'
            >
              <div className='flex items-center justify-between gap-3'>
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    bg,
                    color,
                  )}
                >
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <span className='rounded-pill bg-muted px-2.5 py-1 text-xs font-medium text-foggy'>
                  {t('comingSoon')}
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm font-semibold text-ink-900'>{t(nameKey)}</p>
                <p className='text-lg font-bold text-ink-900'>{t(priceKey)}</p>
              </div>
              <p className='text-sm leading-relaxed text-muted-foreground'>{t(descriptionKey)}</p>
            </li>
          ))}
        </ul>
        <p className='text-xs text-foggy'>{t('plansDisclaimer')}</p>
      </div>
    </section>
  );
}
