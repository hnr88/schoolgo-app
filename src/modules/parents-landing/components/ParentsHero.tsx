import { MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';
import { ParentsFeaturedCard } from '@/modules/parents-landing/components/ParentsFeaturedCard';
import { ParentsHeroSearch } from '@/modules/parents-landing/components/ParentsHeroSearch';

const FEATURED_KEYS: Array<{ key: 'a' | 'b' | 'c'; seed: string }> = [
  { key: 'a', seed: 'scotch-college-melbourne' },
  { key: 'b', seed: 'sydney-grammar-darlinghurst' },
  { key: 'c', seed: 'brisbane-grammar-spring-hill' },
];

export async function ParentsHero() {
  const t = await getTranslations('ParentsHero');

  return (
    <section className='pb-16 pt-28 md:pb-24 md:pt-36'>
      <SectionContainer className='flex flex-col gap-12'>
        <div className='flex flex-col gap-6'>
          <span className='inline-flex w-fit items-center gap-2 rounded-pill border border-babu-100 bg-babu-50 px-3 py-1 text-body-sm text-babu-700'>
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
          {FEATURED_KEYS.map(({ key, seed }) => (
            <ParentsFeaturedCard
              key={key}
              href='/search'
              photoSeed={seed}
              name={t(`featured.cards.${key}.name`)}
              location={t(`featured.cards.${key}.location`)}
              curriculum={t(`featured.cards.${key}.curriculum`)}
              fee={t(`featured.cards.${key}.fee`)}
              boarding={t(`featured.cards.${key}.boarding`)}
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
