import { getTranslations } from 'next-intl/server';
import { FeatureCard, SectionContainer, SectionHeader } from '@/modules/design-system';

import { APPLICATION_QUALITY_ITEMS } from '../constants/schools-landing.constants';

export async function SchoolsApplicationQuality() {
  const t = await getTranslations('SchoolsApplicationQuality');
  return (
    <section id='application-quality' className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {APPLICATION_QUALITY_ITEMS.map(({ key, icon }) => (
            <FeatureCard
              key={key}
              icon={icon}
              size='md'
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
