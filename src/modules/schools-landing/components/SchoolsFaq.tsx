import { getTranslations } from 'next-intl/server';
import { faqPageJsonLd } from '@/lib/seo';
import { SectionContainer } from '@/modules/design-system';
import { FaqAccordion } from '@/modules/parents-landing';

import { FAQ_KEYS } from '../constants/schools-landing.constants';

export async function SchoolsFaq() {
  const t = await getTranslations('SchoolsFaq');

  const items = FAQ_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section id='faq' className='bg-muted py-20 md:py-28'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(items)) }}
      />
      <SectionContainer className='flex flex-col gap-10'>
        <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
          {t('heading')}
        </h2>
        <FaqAccordion items={items} />
      </SectionContainer>
    </section>
  );
}
