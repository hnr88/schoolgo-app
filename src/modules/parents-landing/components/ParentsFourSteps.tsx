import type { ComponentType, SVGProps } from 'react';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, LayoutGrid, ListChecks, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { loadSchools, computeSchoolStats } from '@/lib/schools';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const STEPS: Array<{ key: string; icon: IconComponent; interpolate?: true; comingSoon?: true }> = [
  { key: 'browse', icon: Search, interpolate: true },
  { key: 'shortlist', icon: LayoutGrid },
  { key: 'prepare', icon: ListChecks },
  { key: 'apply', icon: BadgeCheck, comingSoon: true },
];

export async function ParentsFourSteps() {
  const t = await getTranslations('ParentsFourSteps');
  const tc = await getTranslations('Common');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16'>
        <div className='flex flex-col gap-6 md:col-span-6'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='max-w-lg text-body text-foggy md:text-lg'>{t('subheading')}</p>

          <ol className='mt-4 flex flex-col gap-6'>
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.key} className='flex gap-4'>
                  <div className='flex shrink-0 flex-col items-center'>
                    <span className='flex h-12 w-12 items-center justify-center rounded-pill bg-rausch-50 text-primary'>
                      <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                    </span>
                    {index < STEPS.length - 1 && (
                      <span className='mt-2 h-6 w-px bg-divider' aria-hidden='true' />
                    )}
                  </div>
                  <div className='flex flex-col gap-1 pb-2'>
                    <span
                      className='text-caption font-semibold uppercase text-foggy'
                      style={{ letterSpacing: '0.08em' }}
                    >
                      {tc('step', { number: index + 1 })}
                    </span>
                    <h3 className='flex items-center gap-2 text-h4 font-semibold text-ink-900'>
                      {t(`steps.${step.key}.title`)}
                      {step.comingSoon && (
                        <span className='rounded-pill bg-arches-50 px-2.5 py-0.5 text-caption font-semibold text-arches-700'>
                          {t(`steps.${step.key}.comingSoon`)}
                        </span>
                      )}
                    </h3>
                    <p className='text-body-sm text-foggy'>
                      {t(
                        `steps.${step.key}.description`,
                        step.interpolate ? { count: stats.totalSchools } : undefined,
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className='mt-2 flex flex-wrap gap-3'>
            <Link
              href='/search'
              className='inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
            >
              {t('ctaBrowse')}
              <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
            </Link>
            <Link
              href='#how-it-works'
              className='inline-flex items-center gap-2 rounded-pill border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-muted'
            >
              {t('ctaLearn')}
            </Link>
          </div>
        </div>

        <div className='md:col-span-6'>
          <div className='relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl border border-border bg-muted shadow-3'>
            <Image
              src='https://picsum.photos/seed/schoolgo-4steps-device/960/1200'
              alt=''
              fill
              sizes='(max-width: 768px) 100vw, 480px'
              className='object-cover'
              aria-hidden='true'
            />
            <div className='absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-pill bg-babu-50 text-babu-700'>
                <BadgeCheck className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
              </div>
              <div className='flex flex-col'>
                <span className='text-body-sm font-semibold text-ink-900'>
                  {t('badge.cricosVerified')}
                </span>
                <span className='text-caption text-foggy'>{t('badge.updated')}</span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
