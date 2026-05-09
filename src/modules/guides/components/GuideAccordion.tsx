import { FaqSection } from '@/modules/design-system';
import type { GuideAccordionData } from '@/modules/guides/types/guides.types';

export function GuideAccordion({ id, heading, items }: GuideAccordionData) {
  const faqItems = items.map((item) => ({
    question: item.question,
    answer: item.paragraphs.join(' '),
  }));

  return <FaqSection id={id} heading={heading} items={faqItems} />;
}
