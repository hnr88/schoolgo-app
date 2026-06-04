import { MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SchoolCard } from '@/modules/design-system';
import { ParentsHeroSearch } from '@/modules/parents-landing/components/ParentsHeroSearch';
import { getFeaturedSchools } from '@/modules/parents-landing/lib/featured-schools';
import { formatAudCompact } from '@/modules/school-search/lib/format-currency';

export async function ParentsHero() {
  const [t, tCard, featuredSchools] = await Promise.all([
    getTranslations('ParentsHero'),
    getTranslations('SchoolSearch.card'),
    getFeaturedSchools(),
  ]);

  return (
    <section id='main-content' className='relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        {/* arbitrary value: hero ambient blob, no token */}
        <div className='absolute -right-24 -top-24 h-[800px] w-[800px] rounded-full bg-rausch-100 opacity-30 blur-[140px]' />
        {/* arbitrary value: hero ambient blob, no token */}
        <div className='absolute -left-32 top-[60%] h-[600px] w-[600px] rounded-full bg-rausch-200 opacity-20 blur-[120px]' />
        <svg className='absolute inset-0 h-full w-full opacity-5'>
          <defs>
            <pattern id='parents-waves' width='120' height='20' patternUnits='userSpaceOnUse' patternTransform='rotate(-5)'>
              <path d='M0 10 Q30 0 60 10 Q90 20 120 10' fill='none' stroke='currentColor' strokeWidth='0.75' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#parents-waves)' />
        </svg>
      </div>
      <SectionContainer className='relative flex flex-col gap-10'>
        <div className='flex flex-col gap-8'>
          <span className='inline-flex w-fit items-center gap-1.5 rounded-pill border border-border px-3 py-1 text-sm text-babu-700'>
            <MapPin className='h-3.5 w-3.5 shrink-0 text-babu-500' strokeWidth={2} aria-hidden='true' />
            <span className='font-semibold'>{t('trustPill.brand')}</span>
            <span className='italic'>{t('trustPill.brandAccent')}</span>
            <span className='hidden h-3.5 w-px shrink-0 bg-border sm:block' aria-hidden='true' />
            <span className='hidden text-babu-700/70 sm:inline'>{t('trustPill.source')}</span>
          </span>

          <h1 className='font-display text-5xl font-extrabold leading-display-xl tracking-display-lg text-ink-900 md:text-7xl lg:text-8xl'>
            {t('headlinePrefix')}{' '}
            <em className='italic font-medium text-primary'>{t('headlineEmphasis')}</em>{' '}
            {t('headlineSuffix')}
          </h1>

          <p className='max-w-2xl text-body text-foggy md:text-lg md:leading-relaxed'>
            {t('lede')}
          </p>

          <ParentsHeroSearch
            ariaLabel={t('searchAriaLabel')}
            buttonLabel={t('searchButtonLabel')}
            fields={{
              where: {
                label: t('searchFields.where.label'),
                value: t('searchFields.where.value'),
              },
              yearLevel: {
                label: t('searchFields.yearLevel.label'),
                value: t('searchFields.yearLevel.value'),
              },
              fees: {
                label: t('searchFields.fees.label'),
                value: t('searchFields.fees.value'),
              },
            }}
          />
        </div>

        {featuredSchools.length > 0 && (
          <div className='no-scrollbar -mx-5 overflow-x-auto sm:mx-0 sm:overflow-visible'>
            <div className='flex w-max snap-x snap-mandatory gap-4 px-5 pb-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:px-0 sm:pb-0 lg:grid-cols-3'>
              {featuredSchools.map((school) => (
                <div key={school.documentId} className='w-64 snap-start sm:w-auto'>
                  <SchoolCard
                    href='/search'
                    logoUrl={school.logoUrl ?? undefined}
                    name={school.name}
                    location={`${school.suburb}, ${school.state}`}
                    curriculum={school.curriculumOffered ?? undefined}
                    fee={
                      school.lowestAnnualTuition != null
                        ? formatAudCompact(school.lowestAnnualTuition)
                        : undefined
                    }
                    feeSuffix={tCard('currency')}
                    shortlistAddLabel={t('featured.shortlistAdd', { name: school.name })}
                    shortlistRemoveLabel={t('featured.shortlistRemove', { name: school.name })}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}
