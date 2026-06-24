import { BadgeDollarSign, FileCheck2, GraduationCap, HeartHandshake } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import {
  CtaLink,
  FeatureCard,
  SectionContainer,
  SectionHeader,
} from '@/modules/design-system';
import type { IconComponent } from '@/modules/design-system';
import { AGENT_HELP_BENEFITS } from '../constants/agent-help.constants';

const BENEFIT_ICONS: Record<string, IconComponent> = {
  free: BadgeDollarSign,
  matching: GraduationCap,
  applications: FileCheck2,
  welfare: HeartHandshake,
};

export async function ParentsAgentHelp() {
  const t = await getTranslations('ParentsAgentHelp');

  return (
    <section className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4'>
          {AGENT_HELP_BENEFITS.map((key) => (
            <FeatureCard
              key={key}
              size='md'
              icon={BENEFIT_ICONS[key]}
              iconTone={key === 'welfare' ? 'trust' : 'brand'}
              title={t(`benefits.${key}.title`)}
              description={t(`benefits.${key}.description`)}
              className='h-full'
            />
          ))}
        </div>

        <div className='rounded-xl border border-border bg-card p-6 shadow-2 md:p-8'>
          <h3 className='text-h4 font-semibold text-ink-900'>{t('selection.title')}</h3>
          <p className='mt-2 text-body-sm text-foggy'>{t('selection.body')}</p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <CtaLink href='/search?mode=agents' size='lg' arrow>
            {t('ctaPrimary')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
