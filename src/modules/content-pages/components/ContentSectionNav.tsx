import { Link } from '@/i18n/navigation';
import type { ContentSectionNavProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentSectionNav({ items }: ContentSectionNavProps) {
  return (
    <div className='sticky top-16 z-30 border-b border-divider bg-background/90 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-content gap-2 overflow-x-auto px-5 py-3 md:px-8'>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className='shrink-0 rounded-pill border border-border bg-card px-3 py-1.5 text-sm font-semibold text-hof no-underline hover:border-rausch-700 hover:text-rausch-700'
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
