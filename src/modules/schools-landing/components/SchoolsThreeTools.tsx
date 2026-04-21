import { FileText, Inbox, IdCard } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { FeatureCard, SectionContainer, SectionHeader } from '@/modules/design-system';

const TOOLS = [
  { key: 'profile', icon: IdCard },
  { key: 'applications', icon: FileText },
  { key: 'inbox', icon: Inbox },
] as const;

export async function SchoolsThreeTools() {
  const t = await getTranslations('SchoolsThreeTools');
  return (
    <section id='how-it-works' className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
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
