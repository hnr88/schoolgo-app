import { getTranslations } from 'next-intl/server';
import { FeatureCard, SectionContainer, SectionHeader } from '@/modules/design-system';
import { PAIN_POINT_ITEMS } from '../constants/agents-landing.constants';

export async function AgentsPainPoints() {
  const t = await getTranslations('AgentsPainPoints');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {PAIN_POINT_ITEMS.map(({ key, icon }) => (
            <FeatureCard
              key={key}
              icon={icon}
              title={t(`items.${key}.question`)}
              description={t(`items.${key}.answer`)}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
