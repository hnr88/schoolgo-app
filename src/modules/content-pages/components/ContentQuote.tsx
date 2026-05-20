import { Quote } from 'lucide-react';
import { SectionContainer } from '@/modules/design-system';
import type { ContentQuoteProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentQuote({ quote }: ContentQuoteProps) {
  return (
    <section className='bg-ink-900 py-16 text-background md:py-24'>
      <SectionContainer>
        <div className='mx-auto max-w-3xl text-center'>
          <Quote className='mx-auto h-8 w-8 text-background/60' aria-hidden='true' />
          <blockquote className='mt-5 text-2xl font-semibold leading-relaxed md:text-3xl'>
            {quote.quote}
          </blockquote>
          <p className='mt-5 text-sm text-background/70'>
            {quote.name} · {quote.role}
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
