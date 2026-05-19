import { Link } from '@/i18n/navigation';
import type { ContentLink } from '@/modules/content-pages/types/content-pages.types';

export function ContentSectionNav({ items }: { items: ContentLink[] }) {
  return (
    <div className='sticky top-16 z-30 border-b border-divider bg-background/90 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-content gap-2 overflow-x-auto px-5 py-3 md:px-8'>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className='shrink-0 rounded-pill border border-border bg-card px-3 py-1.5 text-sm font-semibold text-hof no-underline hover:border-primary hover:text-primary'
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
