import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function DeadlineTimelineBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Timeline' title='Decision timeline' description='Timeline blocks support admissions, events, orientation, and application pages.' tone='muted'>
      <ol className='grid gap-4 md:grid-cols-3'>
        {page.timeline.map((item) => (
          <li key={item.title} className='rounded-lg border border-border bg-card p-6 shadow-1'>
            <p className='text-sm font-semibold text-primary'>{item.date}</p>
            <h3 className='mt-3 text-lg font-semibold text-ink-900'>{item.title}</h3>
            <p className='mt-2 text-sm leading-6 text-foggy'>{item.description}</p>
            {item.href && <Link href={item.href} className='mt-4 inline-flex text-sm font-semibold text-primary'>Open link</Link>}
          </li>
        ))}
      </ol>
    </BlockShell>
  );
}
