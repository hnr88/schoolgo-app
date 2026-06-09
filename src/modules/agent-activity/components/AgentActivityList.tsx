'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { ActivityRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function AgentActivityList({ rows }: { rows: ActivityRowView[] }) {
  return (
    <div className='flex flex-col divide-y divide-divider'>
      {rows.map((row) => {
        const Icon = row.icon;
        return (
          <Link
            key={row.id}
            href={row.href}
            className='group flex items-center gap-3 px-5 py-3.5 no-underline transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                row.colorClass,
              )}
            >
              <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
            </span>
            <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary-strong'>
              {row.text}
            </span>
            {row.timestamp && (
              <span className='shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-foggy tabular-nums'>
                {row.timestamp}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
