import Image from 'next/image';
import { SectionContainer, StatusBadge } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function HeroMediaBlock({ page }: ContentBlockProps) {
  return (
    <section className='bg-ink-900 py-10 text-background'>
      <SectionContainer>
        <div className='overflow-hidden rounded-xl border border-border bg-card shadow-3'>
          <div className='relative aspect-video'>
            <Image src={page.image} alt={page.imageAlt} fill sizes='100vw' className='object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent' />
            <div className='absolute bottom-5 left-5 right-5'>
              <div className='flex flex-wrap gap-2'>
                {page.searchSignals.map((signal) => (
                  <StatusBadge key={signal.label} tone={signal.tone}>{signal.value}</StatusBadge>
                ))}
              </div>
              <p className='mt-4 max-w-3xl text-2xl font-bold text-background'>{page.aiSummary.answer}</p>
            </div>
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
