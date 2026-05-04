import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FaqAccordionProps } from '@/modules/parents-landing/types/parents-landing.types';

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion>
      {items.map((item, i) => (
        <AccordionItem key={i} className='border-border py-2'>
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
  );
}
