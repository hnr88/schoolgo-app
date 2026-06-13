'use client';

import { Activity, ArrowRight, Inbox } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState, FOCUS_RING, FOCUS_RING_INSET } from '@/modules/core';
import { DashboardSectionHeader } from '@/modules/dashboard/components/DashboardSectionHeader';
import type { ActivityRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function ActivityFeed({ events }: { events: ActivityRowView[] }) {
  const t = useTranslations('Dashboard.activity');
  const tHistory = useTranslations('AgentActivity');
  const hasRows = events.length > 0;

  return (
    <section className='flex flex-col overflow-hidden rounded-lg bg-card shadow-2'>
      <DashboardSectionHeader
        title={t('title')}
        icon={Activity}
        viewAllHref={hasRows ? '/dashboard/applications' : undefined}
        viewAllLabel={t('viewAll')}
      />
      <div className='flex flex-col gap-1 p-3'>
        {!hasRows ? (
          <EmptyState icon={Inbox} title={t('empty')} />
        ) : (
          events.map((event) => {
            const Icon = event.icon;
            return (
              <Link
                key={event.id}
                href={event.href}
                className={cn(
                  'group flex items-center gap-4 rounded-xl px-3 py-4 no-underline transition-colors duration-200 ease-out-quart hover:bg-gray-50',
                  FOCUS_RING_INSET,
                )}
              >
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-md',
                    event.colorClass,
                  )}
                >
                  <Icon className='size-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <span className='min-w-0 flex-1 text-sm text-ink-900 group-hover:text-primary-strong'>
                  {event.text}
                </span>
                {event.timestamp && (
                  <span className='shrink-0 rounded-pill bg-gray-50 px-2.5 py-0.5 text-xs text-foggy tabular-nums'>
                    {event.timestamp}
                  </span>
                )}
              </Link>
            );
          })
        )}
      </div>
      {hasRows && (
        <div className='border-t border-divider px-6 py-4'>
          <Link
            href='/dashboard/activity'
            className={cn(
              'flex items-center gap-1 rounded-md text-sm font-semibold text-primary-strong no-underline hover:underline',
              FOCUS_RING,
            )}
          >
            {tHistory('viewAllHistory')}
            <ArrowRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
          </Link>
        </div>
      )}
    </section>
  );
}
