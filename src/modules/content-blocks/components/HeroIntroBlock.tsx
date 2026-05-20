import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function HeroIntroBlock({ page, designLabel }: ContentBlockProps) {
  return (
    <section className='border-b border-divider bg-background pt-28 md:pt-36'>
      <SectionContainer className='pb-14 md:pb-20'>
        <Eyebrow>{designLabel ?? page.eyebrow}</Eyebrow>
        <h1 className='mt-4 max-w-4xl text-4xl font-bold leading-display text-ink-900 md:text-6xl'>
          {page.title}
        </h1>
        <p className='mt-5 max-w-2xl text-lg leading-relaxed text-foggy'>{page.subtitle}</p>
        <div className='mt-7 flex flex-wrap gap-3'>
          <Link href={page.cta.primary.href} className='inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-3 text-sm font-semibold text-on-primary no-underline shadow-brand'>
            {page.cta.primary.label}
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </Link>
          <Link href={page.cta.secondary.href} className='rounded-pill border border-border bg-card px-5 py-3 text-sm font-semibold text-hof no-underline hover:bg-muted'>
            {page.cta.secondary.label}
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
