'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Eyebrow } from '@/modules/design-system';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { Faq } from '@/modules/agent-detail/types/agent-detail.types';

function answerParagraphs(answer?: string | null): string[] {
  if (!answer) return [];
  return answer
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function FaqSection({ faqs }: { faqs?: Faq[] | null }) {
  const t = useTranslations('AgentDetail.faq');
  const items = (faqs ?? []).filter((f) => f.question && f.answer).sort(byOrder);
  if (items.length === 0) return null;

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="faqs-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <Accordion className="mt-6">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-divider">
            <AccordionTrigger className="py-4 text-left text-body font-semibold text-ink-900 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pb-4">
                {answerParagraphs(item.answer).map((p, j) => (
                  <p key={j} className="text-body-sm leading-relaxed text-foggy">
                    {p}
                  </p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
