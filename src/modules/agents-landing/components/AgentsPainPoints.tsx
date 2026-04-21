import { FileSearch, Inbox, MessagesSquare, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { FeatureCard, SectionContainer, SectionHeader } from '@/modules/design-system';

const ITEMS = [
  { key: 'email', icon: Inbox },
  { key: 'status', icon: MessagesSquare },
  { key: 'trust', icon: ShieldCheck },
  { key: 'requirements', icon: FileSearch },
] as const;

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
          {ITEMS.map(({ key, icon }) => (
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
