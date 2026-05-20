import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentSplitPanelProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentSplitPanel({ page }: ContentSplitPanelProps) {
  return (
    <section id='story' className='bg-muted py-16 md:py-24'>
      <SectionContainer className='grid gap-10 md:grid-cols-2 md:items-center'>
        <div className='relative aspect-video overflow-hidden rounded-xl border border-border bg-card shadow-2'>
          <Image
            src={page.image}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
            aria-hidden='true'
          />
        </div>
        <div>
          <SectionHeader
            eyebrow='Context'
            heading={`Why ${page.title.toLowerCase()} matters`}
            subheading={page.description}
          />
          <div className='mt-6 flex flex-wrap gap-3'>
            {page.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='inline-flex items-center gap-2 rounded-pill border border-border bg-card px-4 py-2 text-sm font-semibold text-hof no-underline hover:border-rausch-700 hover:text-rausch-700'
              >
                {link.label}
                <ArrowRight className='h-4 w-4' aria-hidden='true' />
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
