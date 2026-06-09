'use client';

import { Activity, ArrowRight, Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core';
import { DashboardSectionHeader } from '@/modules/dashboard/components/DashboardSectionHeader';
import type { ActivityRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function ActivityFeed({ events }: { events: ActivityRowView[] }) {
  const t = useTranslations('Dashboard.activity');
  const tHistory = useTranslations('AgentActivity');
  const hasRows = events.length > 0;

  return (
    <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'>
      <DashboardSectionHeader
        title={t('title')}
        icon={Activity}
        viewAllHref={hasRows ? '/dashboard/applications' : undefined}
        viewAllLabel={t('viewAll')}
      />
      <div className='flex flex-col divide-y divide-divider'>
        {!hasRows ? (
          <EmptyState icon={Inbox} title={t('empty')} />
        ) : (
          events.map((event) => {
            const Icon = event.icon;
            return (
              <Link
                key={event.id}
                href={event.href}
                className='group flex items-center gap-3 px-5 py-3.5 no-underline transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'
              >
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                    event.colorClass,
                  )}
                >
                  <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary-strong'>
                  {event.text}
                </span>
                {event.timestamp && (
                  <span className='shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-foggy tabular-nums'>
                    {event.timestamp}
                  </span>
                )}
              </Link>
            );
          })
        )}
      </div>
      {hasRows && (
        <div className='border-t border-divider px-5 py-3'>
          <Link
            href='/dashboard/activity'
            className='flex items-center gap-1 rounded-md text-sm font-semibold text-primary-strong no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            {tHistory('viewAllHistory')}
            <ArrowRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
          </Link>
        </div>
      )}
    </section>
  );
}
