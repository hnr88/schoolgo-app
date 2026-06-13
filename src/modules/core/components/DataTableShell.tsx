import { cn } from '@/lib/utils';
import type { DataTableShellProps } from '@/modules/core/types/component.types';

/**
 * Borderless table shell (§3.6): rounded-lg (16px) card wrapper with a quiet
 * sticky header (uppercase --foggy labels + bottom hairline, no gray strip),
 * comfortable h-16 rows and soft hover. Wrap the shadcn <Table> inside; this
 * shell styles the data-slots without editing src/components/ui/*.
 */
export function DataTableShell({
  children,
  stickyHeader = true,
  className,
}: DataTableShellProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-card shadow-2',
        // Quiet header: drop the gray strip + per-th border, uppercase --foggy labels.
        '[&_[data-slot=table-header]_tr]:border-b [&_[data-slot=table-header]_tr]:border-divider',
        '[&_[data-slot=table-head]]:h-12 [&_[data-slot=table-head]]:px-6 [&_[data-slot=table-head]]:text-xs [&_[data-slot=table-head]]:font-semibold [&_[data-slot=table-head]]:uppercase [&_[data-slot=table-head]]:tracking-wide [&_[data-slot=table-head]]:text-foggy',
        stickyHeader &&
          '[&_[data-slot=table-header]]:sticky [&_[data-slot=table-header]]:top-0 [&_[data-slot=table-header]]:z-10 [&_[data-slot=table-header]]:bg-card',
        // Roomy borderless rows with soft hover.
        '[&_[data-slot=table-body]_tr]:border-0',
        '[&_[data-slot=table-row]]:transition-colors [&_[data-slot=table-row]:hover]:bg-gray-50',
        '[&_[data-slot=table-cell]]:h-16 [&_[data-slot=table-cell]]:px-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
