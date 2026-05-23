'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface FaqItem {
  q: string;
  a: string;
}

function parseFaqItems(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (it): it is { q: unknown; a: unknown } =>
        typeof it === 'object' && it !== null && 'q' in it && 'a' in it,
    )
    .map((it) => ({
      q: typeof it.q === 'string' ? it.q : '',
      a: typeof it.a === 'string' ? it.a : '',
    }))
    .filter((it) => it.q && it.a);
}

interface FaqSchoolSectionProps {
  school: SchoolDetail;
}

export function FaqSchoolSection({ school }: FaqSchoolSectionProps) {
  const t = useTranslations('SchoolDetail.faq');
  const items = parseFaqItems(school.faqItems);
  if (items.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2
        id="faq-heading"
        className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl"
      >
        {t('heading')}
      </h2>
      <Accordion className="mt-6">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-divider">
            <AccordionTrigger className="py-4 text-left text-body font-semibold text-ink-900 hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent>
              <p className="pb-4 text-body-sm text-foggy leading-relaxed">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
