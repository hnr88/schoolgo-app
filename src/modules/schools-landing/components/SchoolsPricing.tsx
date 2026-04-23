import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader, StatusBadge } from '@/modules/design-system';

const PLANS: Array<{
  key: 'listing' | 'admissions';
  featured?: boolean;
  featureKeys: string[];
  ctaHref: string;
}> = [
  { key: 'listing', featureKeys: ['a', 'b', 'c'], ctaHref: '/schools' },
  { key: 'admissions', featured: true, featureKeys: ['a', 'b', 'c', 'd'], ctaHref: '/schools' },
];

export async function SchoolsPricing() {
  const t = await getTranslations('SchoolsPricing');
  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-2'>
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
                  <StatusBadge tone='brand' size='md' className='absolute -top-3 left-6 bg-primary text-on-primary shadow-brand px-3'>
                    {t('plans.admissions.badge')}
                  </StatusBadge>
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
                <CtaLink
                  href={plan.ctaHref}
                  variant={featured ? 'primary' : 'secondary'}
                  arrow
                  justify
                >
                  {t(`plans.${plan.key}.cta`)}
                </CtaLink>
              </article>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
