import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader, StatusBadge, TrustBadge } from '@/modules/design-system';
import { getFeaturedSchools } from '@/modules/schools-landing/lib/featured-schools';
import { MATCHING_STEPS } from '../constants/agents-landing.constants';
import { hueFromString, initialsFromName } from '../lib/featured-schools';

export async function AgentsMatching() {
  const [t, tc, schools] = await Promise.all([
    getTranslations('AgentsMatching'),
    getTranslations('Common'),
    getFeaturedSchools(3),
  ]);

  return (
    <section id='how-it-works' className='py-16 md:py-20'>
      <SectionContainer className='grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12'>
        <div className='flex flex-col gap-8 md:col-span-6'>
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />

          <ol className='mt-4 flex flex-col gap-8'>
            {MATCHING_STEPS.map((step) => {
              const Icon = step.icon;
              return (
              <li key={step.key} className='flex gap-4'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-babu-50 text-babu-700'>
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <div className='flex flex-col gap-1'>
                  <h3 className='flex items-center gap-2 text-h4 font-semibold text-ink-900'>
                    {t(`steps.${step.key}.title`)}
                    {step.comingSoon && (
                      <StatusBadge>{t(`steps.${step.key}.comingSoon`)}</StatusBadge>
                    )}
                  </h3>
                  <p className='text-body-sm text-foggy'>{t(`steps.${step.key}.description`)}</p>
                </div>
              </li>
              );
            })}
          </ol>
        </div>

        <div className='md:col-span-6'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-3'>
            <div className='flex items-center justify-between border-b border-divider bg-muted px-5 py-3'>
              <span
                className='text-label font-semibold uppercase tracking-eyebrow text-foggy'

              >
                {t('inboxLabel')}
              </span>
              <TrustBadge variant='qeac' label={tc('qeacVerified')} />
            </div>
            <ul className='divide-y divide-divider'>
              {schools.map((school) => {
                const hue = hueFromString(school.name);
                return (
                  <li key={school.slug} className='flex items-center gap-4 px-5 py-4'>
                    <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-card'>
                      {school.logoUrl ? (
                        <Image
                          src={school.logoUrl}
                          alt=''
                          fill
                          sizes='48px'
                          className='object-contain p-1.5'
                          aria-hidden='true'
                        />
                      ) : (
                        <div
                          className='flex h-full w-full items-center justify-center text-caption font-bold text-white'
                          style={{ backgroundColor: `hsl(${hue} 65% 45%)` }}
                          aria-hidden='true'
                        >
                          {initialsFromName(school.name)}
                        </div>
                      )}
                    </div>
                    <div className='flex min-w-0 flex-1 flex-col'>
                      <span className='text-body-sm font-semibold text-ink-900'>
                        {school.name}
                      </span>
                      <span className='text-caption text-foggy'>
                        {school.suburb}, {school.state}
                      </span>
                    </div>
                    <StatusBadge tone='trust' size='md'>
                      {school.sector}
                    </StatusBadge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
