import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { ContentCtaBandProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentCtaBand({ page }: ContentCtaBandProps) {
  return (
    <section className='bg-background py-16 md:py-24'>
      <SectionContainer>
        <div className='rounded-xl bg-ink-900 p-7 text-background shadow-4 md:flex md:items-center md:justify-between md:gap-8 md:p-10'>
          <div>
            <h2 className='text-3xl font-bold text-background'>{page.cta.title}</h2>
            <p className='mt-3 max-w-2xl text-sm leading-6 text-background/70'>
              {page.cta.description}
            </p>
          </div>
          <div className='mt-6 flex flex-wrap gap-3 md:mt-0'>
            <Link
              href={page.cta.primary.href}
              data-slot='button'
              className='inline-flex items-center gap-2 rounded-pill bg-background px-5 py-3 text-sm font-semibold text-ink-900 no-underline hover:bg-muted'
            >
              {page.cta.primary.label}
              <ArrowRight className='h-4 w-4' aria-hidden='true' />
            </Link>
            <Link
              href={page.cta.secondary.href}
              data-slot='button'
              className='inline-flex rounded-pill border border-background/20 px-5 py-3 text-sm font-semibold text-background no-underline hover:bg-background/10'
            >
              {page.cta.secondary.label}
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
