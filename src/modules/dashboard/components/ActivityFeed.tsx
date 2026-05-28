'use client';

import { Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core';
import type { ActivityRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function ActivityFeed({ events }: { events: ActivityRowView[] }) {
  const t = useTranslations('Dashboard.activity');

  return (
    <div className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-1'>
      <div className='border-b border-divider px-6 py-5'>
        <h2 className='text-base font-bold text-ink-900'>{t('title')}</h2>
      </div>
      <div className='flex flex-col divide-y divide-divider'>
        {events.length === 0 ? (
          <EmptyState icon={Inbox} title={t('empty')} />
        ) : (
          events.map((event) => {
            const Icon = event.icon;
            return (
              <Link
                key={event.id}
                href={event.href}
                className='group flex items-center gap-3 px-6 py-4 no-underline transition-colors hover:bg-muted'
              >
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                    event.colorClass,
                  )}
                >
                  <Icon className='h-4 w-4' strokeWidth={1.75} />
                </span>
                <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary'>
                  {event.text}
                </span>
                {event.timestamp && (
                  <span className='shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-foggy'>
                    {event.timestamp}
                  </span>
                )}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
