import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function CtaBannerBlock({ page }: ContentBlockProps) {
  return (
    <section className='bg-background py-12'>
      <SectionContainer>
        <div className='rounded-xl bg-ink-900 p-7 text-background shadow-4 md:flex md:items-center md:justify-between md:gap-8 md:p-10'>
          <div>
            <h2 className='text-3xl font-bold text-background'>{page.cta.title}</h2>
            <p className='mt-3 max-w-2xl text-sm leading-6 text-background/70'>{page.cta.description}</p>
          </div>
          <Link href={page.cta.primary.href} className='mt-6 inline-flex items-center gap-2 rounded-pill bg-background px-5 py-3 text-sm font-semibold text-ink-900 no-underline hover:bg-muted md:mt-0'>
            {page.cta.primary.label}
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
