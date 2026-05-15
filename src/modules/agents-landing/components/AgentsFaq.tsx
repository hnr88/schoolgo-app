import { getTranslations } from 'next-intl/server';
import { faqPageJsonLd } from '@/modules/seo';
import { FaqSection } from '@/modules/design-system';
import { AGENTS_FAQ_KEYS } from '../constants/agents-landing.constants';

export async function AgentsFaq() {
  const t = await getTranslations('AgentsFaq');

  const items = AGENTS_FAQ_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(items)) }}
      />
      <FaqSection id='faq' heading={t('heading')} items={items} />
    </>
  );
}
