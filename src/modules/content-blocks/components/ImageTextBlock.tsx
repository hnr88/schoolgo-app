import Image from 'next/image';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ImageTextBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Story' title={`Why ${page.title.toLowerCase()} matters`} description={page.description} tone='muted'>
      <div className='grid gap-8 md:grid-cols-2 md:items-center'>
        <div className='relative aspect-video overflow-hidden rounded-xl border border-border bg-card shadow-2'>
          <Image src={page.image} alt='' fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover' aria-hidden='true' />
        </div>
        <div className='rounded-lg border border-border bg-card p-6 shadow-1'>
          <p className='text-lg font-semibold text-ink-900'>{page.quote.quote}</p>
          <p className='mt-4 text-sm text-foggy'>{page.quote.name} · {page.quote.role}</p>
        </div>
      </div>
    </BlockShell>
  );
}
