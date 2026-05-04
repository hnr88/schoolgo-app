import { MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SchoolCard } from '@/modules/design-system';
import { ParentsHeroSearch } from '@/modules/parents-landing/components/ParentsHeroSearch';
import { FEATURED_KEYS } from '../constants/parents-landing.constants';

export async function ParentsHero() {
  const t = await getTranslations('ParentsHero');

  return (
    <section className='relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute -right-24 -top-24 h-[800px] w-[800px] rounded-full bg-rausch-100 opacity-30 blur-[140px]' />
        <div className='absolute -left-32 top-[60%] h-[600px] w-[600px] rounded-full bg-rausch-200 opacity-20 blur-[120px]' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.07]'>
          <defs>
            <pattern id='parents-waves' width='120' height='20' patternUnits='userSpaceOnUse' patternTransform='rotate(-5)'>
              <path d='M0 10 Q30 0 60 10 Q90 20 120 10' fill='none' stroke='currentColor' strokeWidth='0.75' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#parents-waves)' />
        </svg>
      </div>
      <SectionContainer className='relative flex flex-col gap-12'>
        <div className='flex flex-col gap-6'>
          <span className='inline-flex w-fit items-center gap-2 rounded-pill border border-border px-3 py-1 text-sm text-babu-700'>
            <MapPin className='h-3.5 w-3.5 text-babu-500' strokeWidth={2} aria-hidden='true' />
            <span className='font-semibold text-babu-700'>{t('trustPill.brand')}</span>{' '}
            <span className='italic text-babu-700'>{t('trustPill.brandAccent')}</span>{' '}
            <span className='text-babu-700/80'>{t('trustPill.source')}</span>
          </span>

          <h1 className='font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-ink-900 md:text-7xl lg:text-[5.5rem]'>
            {t('headlinePrefix')}{' '}
            <em className='italic font-medium text-foggy'>{t('headlineEmphasis')}</em>{' '}
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

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {FEATURED_KEYS.map(({ key, image }) => (
            <SchoolCard
              key={key}
              href='/search'
              photoUrl={image}
              name={t(`featured.cards.${key}.name`)}
              location={t(`featured.cards.${key}.location`)}
              curriculum={t(`featured.cards.${key}.curriculum`)}
              fee={t(`featured.cards.${key}.fee`)}
              feeSuffix='/ year'
              boarding={t(`featured.cards.${key}.boarding`)}
              rating={t(`featured.cards.${key}.rating`)}
              shortlistAddLabel={t('featured.shortlistAdd', {
                name: t(`featured.cards.${key}.name`),
              })}
              shortlistRemoveLabel={t('featured.shortlistRemove', {
                name: t(`featured.cards.${key}.name`),
              })}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
