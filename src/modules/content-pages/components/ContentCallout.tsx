import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { ContentCalloutProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentCallout({ page }: ContentCalloutProps) {
  return (
    <section className='bg-background py-10'>
      <SectionContainer>
        <div className='rounded-xl border border-babu-100 bg-babu-50 p-6 md:flex md:items-center md:justify-between md:gap-8'>
          <div>
            <p className='text-sm font-semibold text-babu-700'>Suggested handoff</p>
            <h2 className='mt-2 text-2xl font-bold text-ink-900'>{page.cta.title}</h2>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-hof'>{page.cta.description}</p>
          </div>
          <Link
            href={page.cta.primary.href}
            data-slot='button'
            className='mt-5 inline-flex items-center gap-2 rounded-pill bg-babu-700 px-5 py-3 text-sm font-semibold text-background no-underline hover:bg-babu-600 md:mt-0'
          >
            {page.cta.primary.label}
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
