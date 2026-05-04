import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

import { STATS_ITEMS } from '../constants/schools-landing.constants';

export async function SchoolsStats() {
  const t = await getTranslations('SchoolsStats');
  return (
    <section className='bg-ink-900 py-20 text-background md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          theme='dark'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <dl className='grid grid-cols-2 gap-x-8 gap-y-10 border-t border-background/15 pt-10 md:grid-cols-4'>
          {STATS_ITEMS.map((key) => (
            <div key={key} className='flex flex-col gap-2'>
              <dd className='font-display text-4xl font-extrabold tracking-[-0.025em] text-background md:text-6xl'>
                {t(`items.${key}.value`)}
              </dd>
              <dt className='text-body-sm text-background/70'>{t(`items.${key}.label`)}</dt>
            </div>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}
