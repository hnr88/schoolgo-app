'use client';

import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const FULL_BLEED_SEGMENTS = ['/dashboard/search', '/compare'] as const;

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullBleed = FULL_BLEED_SEGMENTS.some((segment) =>
    pathname.includes(segment),
  );

  return (
    <div
      className={cn(
        isFullBleed
          ? 'w-full px-6 py-8'
          : 'container px-6 py-8 lg:px-8',
      )}
    >
      {children}
    </div>
  );
}
