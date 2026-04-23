import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';
import { FaqAccordion } from '@/modules/parents-landing';

const FAQ_KEYS = ['claim', 'agents', 'commission', 'data'] as const;

export async function SchoolsFaq() {
  const t = await getTranslations('SchoolsFaq');

  const items = FAQ_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
          {t('heading')}
        </h2>
        <FaqAccordion items={items} />
      </SectionContainer>
    </section>
  );
}
