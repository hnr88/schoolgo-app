import Image from 'next/image';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ImageTextBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Story' title={`Why ${page.title.toLowerCase()} matters`} description={page.description} tone='featured'>
      <div className='grid gap-8 md:grid-cols-2 md:items-center'>
        <div className='group relative aspect-video overflow-hidden rounded-xl border border-border bg-card shadow-3'>
          <Image src={page.image} alt='' fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover transition-transform duration-500 group-hover:scale-105' aria-hidden='true' />
        </div>
        <div className='rounded-lg border border-border bg-card p-6 shadow-2'>
          <p className='text-xs font-semibold uppercase text-rausch-700'>Editorial proof</p>
          <p className='text-lg font-semibold text-ink-900'>{page.quote.quote}</p>
          <p className='mt-4 text-sm text-foggy'>{page.quote.name} · {page.quote.role}</p>
          <div className='mt-5 grid gap-3'>
            {page.proofPoints.slice(0, 2).map((point) => (
              <div key={point.label} className='rounded-lg bg-muted p-3'>
                <p className='text-sm font-semibold text-ink-900'>{point.label}</p>
                <p className='mt-1 text-xs leading-5 text-foggy'>{point.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockShell>
  );
}
