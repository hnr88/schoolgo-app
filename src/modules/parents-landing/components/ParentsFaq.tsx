import { getTranslations } from 'next-intl/server';
import { faqPageJsonLd } from '@/lib/seo';
import { FaqSection } from '@/modules/design-system';
import { FAQ_KEYS } from '../constants/parents-landing.constants';

export async function ParentsFaq() {
  const t = await getTranslations('ParentsFaq');

  const items = FAQ_KEYS.map((key) => ({
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
