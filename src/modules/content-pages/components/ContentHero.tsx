import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer } from '@/modules/design-system';
import { cn } from '@/lib/utils';
import type { ContentHeroProps } from '@/modules/content-pages/types/content-component-props.types';

const accentClasses = {
  brand: 'text-rausch-700',
  trust: 'text-babu-700',
  featured: 'text-arches-700',
  muted: 'text-foggy',
};

export function ContentHero({ page }: ContentHeroProps) {
  return (
    <section className='border-b border-divider bg-background'>
      <SectionContainer className='grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20'>
        <div>
          <Eyebrow className={accentClasses[page.accent]}>{page.eyebrow}</Eyebrow>
          <h1 className='mt-4 max-w-3xl font-display text-4xl font-bold leading-display text-ink-900 md:text-6xl'>
            {page.title}
          </h1>
          <p className='mt-5 max-w-2xl text-lg leading-relaxed text-foggy md:text-xl'>
            {page.subtitle}
          </p>
          <div className='mt-7 flex flex-wrap gap-3'>
            <Link
              href={page.cta.primary.href}
              data-slot='button'
              className='inline-flex items-center justify-center gap-2 rounded-pill bg-rausch-700 px-5 py-3 text-sm font-semibold text-background shadow-brand no-underline hover:bg-rausch-600'
            >
              {page.cta.primary.label}
              <ArrowRight className='h-4 w-4' aria-hidden='true' />
            </Link>
            <Link
              href={page.cta.secondary.href}
              data-slot='button'
              className='inline-flex items-center justify-center rounded-pill border border-border bg-card px-5 py-3 text-sm font-semibold text-hof no-underline hover:bg-muted'
            >
              {page.cta.secondary.label}
            </Link>
          </div>
        </div>
        <div className='relative overflow-hidden rounded-xl border border-border bg-muted shadow-3'>
          <div className='relative aspect-video'>
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              priority
              sizes='(max-width: 768px) 100vw, 50vw'
              className={cn('object-cover', page.accent === 'muted' && 'grayscale')}
            />
          </div>
          <div className='grid grid-cols-3 border-t border-border bg-card'>
            {page.metrics.map((metric) => (
              <div key={metric.label} className='border-r border-divider p-4 last:border-r-0'>
                <p className='text-lg font-bold text-ink-900'>{metric.value}</p>
                <p className='mt-1 text-xs leading-5 text-foggy'>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
