import Image from 'next/image';
import { SectionContainer } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function HeroMediaBlock({ page }: ContentBlockProps) {
  return (
    <section className='bg-muted py-10'>
      <SectionContainer>
        <div className='overflow-hidden rounded-xl border border-border bg-card shadow-3'>
          <div className='relative aspect-video'>
            <Image src={page.image} alt={page.imageAlt} fill sizes='100vw' className='object-cover' />
          </div>
          <div className='grid gap-0 border-t border-border md:grid-cols-3'>
            {page.metrics.map((metric) => (
              <div key={metric.label} className='border-b border-divider p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0'>
                <p className='text-2xl font-bold text-ink-900'>{metric.value}</p>
                <p className='mt-1 text-sm text-foggy'>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
