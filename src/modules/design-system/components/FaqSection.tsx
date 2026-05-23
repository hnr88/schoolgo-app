'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { SectionContainer } from '@/modules/design-system/components/SectionContainer';
import type { FaqSectionProps } from '@/modules/design-system/types/design-system.types';

export function FaqSection({ heading, items, id, className }: FaqSectionProps) {
  return (
    <section id={id} className={cn('bg-muted py-16 md:py-20', className)}>
      <SectionContainer className='flex flex-col gap-10'>
        <h2 className='font-display text-4xl font-bold leading-display tracking-display text-ink-900 md:text-5xl'>
          {heading}
        </h2>
        <Accordion>
          {items.map((item, i) => (
            <AccordionItem key={i} className='border-border py-3'>
              <AccordionTrigger className='py-4 text-h4 font-semibold text-ink-900 hover:no-underline'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className='max-w-3xl text-body text-foggy md:text-lg'>
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContainer>
    </section>
  );
}
