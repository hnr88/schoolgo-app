import { getTranslations } from 'next-intl/server';
import { FeatureCard, SectionContainer, SectionHeader } from '@/modules/design-system';

import { TOOLS } from '../constants/schools-landing.constants';

export async function SchoolsThreeTools() {
  const t = await getTranslations('SchoolsThreeTools');
  return (
    <section id='how-it-works' className='py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {TOOLS.map(({ key, icon }) => (
            <FeatureCard
              key={key}
              icon={icon}
              size='md'
              title={t(`tools.${key}.title`)}
              description={t(`tools.${key}.description`)}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
