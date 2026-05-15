'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

function formatAud(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

function lowestTuition(school: SchoolDetail): number | null {
  const values = [
    school.primaryAnnualTuition,
    school.juniorSecAnnualTuition,
    school.seniorSecAnnualTuition,
  ].filter((v): v is number => v != null);
  return values.length > 0 ? Math.min(...values) : null;
}

export function FaqSchoolSection({ school }: { school: SchoolDetail }) {
  const t = useTranslations('SchoolDetail.faq');

  const tuition = lowestTuition(school);

  const vars = {
    name: school.name,
    cricos: school.cricosCode ?? '—',
    suburb: school.suburb ?? '—',
    state: school.state ?? '—',
    tuition: tuition != null ? formatAud(tuition) : '—',
    boardingFee: school.feeBoardingAnnual != null ? formatAud(school.feeBoardingAnnual) : '—',
    applicationFee: school.applicationFee != null ? formatAud(school.applicationFee) : '—',
    curriculum: school.curriculumOffered ?? '—',
    sector: school.sector ?? '—',
  };

  const items = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'].map((k) => ({
    q: t(`items.${k}.q`, vars),
    a: t(`items.${k}.a`, vars),
  }));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="faq-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
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
