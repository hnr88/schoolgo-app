import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function AnchorPillNavBlock({ page, designLabel }: ContentBlockProps) {
  const items = ['overview', 'proof', 'steps', 'links', 'related'];
  return (
    <div className='sticky top-16 z-30 border-b border-divider bg-background/90 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-content flex-col gap-3 px-5 py-3 md:px-8 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex gap-2 overflow-x-auto'>
          {items.map((item) => (
            <Link key={item} href={`#${item}`} className='shrink-0 rounded-pill border border-border bg-card px-3 py-1.5 text-sm font-semibold capitalize text-hof no-underline hover:border-primary hover:text-primary'>
              {item}
            </Link>
          ))}
        </div>
        <div className='flex gap-2 overflow-x-auto'>
          {page.searchSignals.map((signal) => (
            <StatusBadge key={signal.label} tone={signal.tone}>
              {signal.value}
            </StatusBadge>
          ))}
          <StatusBadge tone='muted'>{designLabel ?? page.eyebrow}</StatusBadge>
        </div>
      </div>
    </div>
  );
}
