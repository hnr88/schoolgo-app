import { HeartHandshake } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { FeatureCard, SectionContainer, SectionHeader } from '@/modules/design-system';
import {
  ACCOMMODATION_ICONS,
  ACCOMMODATION_KEYS,
  WELFARE_KEYS,
} from '../constants/accommodation-welfare.constants';

export async function ParentsAccommodationWelfare() {
  const t = await getTranslations('ParentsAccommodationWelfare');

  return (
    <section id='accommodation-welfare' className='py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('body')}
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4'>
          {ACCOMMODATION_KEYS.map((key) => (
            <FeatureCard
              key={key}
              size='md'
              icon={ACCOMMODATION_ICONS[key]}
              iconTone={key === 'guardians' ? 'trust' : 'brand'}
              title={t(`accommodation.${key}.title`)}
              description={t(`accommodation.${key}.description`)}
              className='h-full'
            />
          ))}
        </div>

        <div className='flex flex-col gap-5'>
          <h3 className='text-h4 font-semibold text-ink-900'>{t('welfareHeading')}</h3>
          <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {WELFARE_KEYS.map((key) => (
              <li
                key={key}
                className='flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-1'
              >
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-babu-50 text-babu-700'>
                  <HeartHandshake className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
                </span>
                <span className='text-body-sm text-ink-900'>{t(`welfare.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
}
