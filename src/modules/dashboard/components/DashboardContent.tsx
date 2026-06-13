'use client';

import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const FULL_BLEED_SEGMENTS = ['/dashboard/search', '/compare', '/parent/search'] as const;
const SEARCH_SEGMENTS = ['/dashboard/search', '/parent/search'] as const;

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullBleed = FULL_BLEED_SEGMENTS.some((segment) =>
    pathname.includes(segment),
  );
  // The search shell manages its own height and internal scrolling, so it must
  // fill the content area exactly (no page scroll, no outer padding).
  const isSearch = SEARCH_SEGMENTS.some((segment) => pathname.includes(segment));

  if (isSearch) {
    return <div className="flex h-full w-full overflow-hidden">{children}</div>;
  }

  return (
    <div
      className={cn(
        'w-full px-6 py-10 lg:px-12',
        !isFullBleed && 'max-w-canvas',
      )}
    >
      {children}
    </div>
  );
}
