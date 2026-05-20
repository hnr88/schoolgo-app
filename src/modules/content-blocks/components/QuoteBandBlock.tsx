import { Quote } from 'lucide-react';
import { SectionContainer } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function QuoteBandBlock({ page }: ContentBlockProps) {
  return (
    <section className='bg-ink-900 py-16 text-background md:py-24'>
      <SectionContainer>
        <div className='mx-auto max-w-3xl text-center'>
          <Quote className='mx-auto h-8 w-8 text-background/60' aria-hidden='true' />
          <blockquote className='mt-5 text-2xl font-semibold leading-relaxed md:text-3xl'>{page.quote.quote}</blockquote>
          <p className='mt-5 text-sm text-background/70'>{page.quote.name} · {page.quote.role}</p>
        </div>
      </SectionContainer>
    </section>
  );
}
