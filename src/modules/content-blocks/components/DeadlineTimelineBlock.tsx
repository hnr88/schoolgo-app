import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function DeadlineTimelineBlock({ page, relatedPages = [] }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Timeline' title='Decision timeline' description='Timeline blocks support admissions, events, orientation, and application pages.' tone='muted'>
      <ol className='grid gap-4 md:grid-cols-3'>
        {page.timeline.map((item, index) => {
          const imagePage = relatedPages[index] ?? page;
          return (
          <li key={item.title} className='group overflow-hidden rounded-lg border border-border bg-card shadow-1 hover:shadow-3'>
            <div className='relative aspect-video bg-muted'>
              <Image src={imagePage.image} alt='' fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform group-hover:scale-105' aria-hidden='true' />
              <span className='absolute left-4 top-4'>
                <StatusBadge tone='brand'>{item.date}</StatusBadge>
              </span>
            </div>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-ink-900'>{item.title}</h3>
              <p className='mt-2 text-sm leading-6 text-foggy'>{item.description}</p>
              {item.href && <Link href={item.href} className='mt-4 inline-flex text-sm font-semibold text-primary'>Open link</Link>}
            </div>
          </li>
          );
        })}
      </ol>
    </BlockShell>
  );
}
