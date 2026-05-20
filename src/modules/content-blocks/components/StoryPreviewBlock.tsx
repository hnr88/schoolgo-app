import Image from 'next/image';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function StoryPreviewBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Preview' title='Story preview block' description='A small editorial block can introduce a student story, school profile, family journey, or case study.'>
      <div className='grid overflow-hidden rounded-xl border border-border bg-card shadow-2 md:grid-cols-2'>
        <div className='relative aspect-video md:aspect-auto'>
          <Image src={page.image} alt='' fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover' aria-hidden='true' />
        </div>
        <div className='p-6 md:p-8'>
          <p className='text-sm font-semibold text-rausch-700'>Story preview</p>
          <h3 className='mt-3 text-2xl font-bold text-ink-900'>{page.title}</h3>
          <p className='mt-3 text-sm leading-6 text-foggy'>{page.description}</p>
        </div>
      </div>
    </BlockShell>
  );
}
