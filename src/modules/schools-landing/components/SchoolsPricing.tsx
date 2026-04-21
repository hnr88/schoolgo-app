import { ArrowRight, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

const PLANS: Array<{
  key: 'listing' | 'admissions' | 'network';
  featured?: boolean;
  featureKeys: string[];
  ctaHref: string;
}> = [
  { key: 'listing', featureKeys: ['a', 'b', 'c'], ctaHref: '/schools' },
  { key: 'admissions', featured: true, featureKeys: ['a', 'b', 'c', 'd'], ctaHref: '/schools' },
  { key: 'network', featureKeys: ['a', 'b', 'c'], ctaHref: '/schools' },
];

export async function SchoolsPricing() {
  const t = await getTranslations('SchoolsPricing');
  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {PLANS.map((plan) => {
            const featured = plan.featured;
            return (
              <article
                key={plan.key}
                className={
                  featured
                    ? 'relative flex flex-col gap-5 rounded-2xl border-2 border-primary bg-card p-8 shadow-3'
                    : 'flex flex-col gap-5 rounded-2xl border border-border bg-card p-8 shadow-2'
                }
              >
                {featured && t.has('plans.admissions.badge') && (
                  <span className='absolute -top-3 left-6 rounded-pill bg-primary px-3 py-1 text-caption font-semibold text-on-primary shadow-brand'>
                    {t('plans.admissions.badge')}
                  </span>
                )}
                <div className='flex flex-col gap-1'>
                  <span
                    className='text-label font-semibold uppercase text-foggy'
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {t(`plans.${plan.key}.name`)}
                  </span>
                  <div className='flex items-baseline gap-2'>
                    <span className='font-display text-5xl font-extrabold tracking-tight text-ink-900'>
                      {t(`plans.${plan.key}.price`)}
                    </span>
                    <span className='text-body-sm text-foggy'>
                      {t(`plans.${plan.key}.priceMeta`)}
                    </span>
                  </div>
                </div>
                <ul className='flex flex-col gap-2 border-t border-divider pt-5 text-body-sm'>
                  {plan.featureKeys.map((f) => (
                    <li key={f} className='flex items-start gap-2 text-foreground'>
                      <Check
                        className='mt-0.5 h-4 w-4 shrink-0 text-babu-500'
                        strokeWidth={2.25}
                        aria-hidden='true'
                      />
                      {t(`plans.${plan.key}.features.${f}`)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={
                    featured
                      ? 'inline-flex items-center justify-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
                      : 'inline-flex items-center justify-center gap-2 rounded-pill border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-muted'
                  }
                >
                  {t(`plans.${plan.key}.cta`)}
                  <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
                </Link>
              </article>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
