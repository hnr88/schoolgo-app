'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { History, Inbox } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, FOCUS_RING } from '@/modules/core';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { useParentDerivedApplications } from '@/modules/dashboard/parent/hooks/useParentDerivedApplications';
import type { ParentTimelineKind } from '@/modules/dashboard/parent/types/parent-dashboard.types';

const LABEL_KEY: Record<ParentTimelineKind, string> = {
  submitted: 'timelineSubmitted',
  statusChanged: 'timelineStatusChanged',
  offerReceived: 'timelineOfferReceived',
};

export function ParentTimelineCard() {
  const t = useTranslations('ParentDashboard');
  const format = useFormatter();
  const { timeline, isLoading, isError, refetch } = useParentDerivedApplications();

  return (
    <ParentDashboardCard title={t('timelineTitle')} icon={History}>
      {isLoading ? (
        <ParentSummaryRowsSkeleton rows={3} />
      ) : isError ? (
        <ErrorState message={t('timelineError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      ) : timeline.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={t('timelineEmptyTitle')}
          description={t('timelineEmptySubtitle')}
        />
      ) : (
        <ul className='flex flex-col gap-0.5'>
          {timeline.map((event) => {
            const Icon = event.icon;
            return (
              <li key={event.id}>
                <Link
                  href={event.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-2 py-3 no-underline transition-colors duration-200 ease-out-quart hover:bg-gray-50',
                    FOCUS_RING,
                  )}
                >
                  <Icon
                    className='h-4 w-4 shrink-0 text-foggy transition-colors duration-200 ease-out-quart group-hover:text-ink-900'
                    strokeWidth={1.75}
                    aria-hidden='true'
                  />
                  <span className='flex min-w-0 flex-1 flex-col'>
                    <span className='truncate text-sm text-ink-900 group-hover:text-primary-strong'>
                      {t(LABEL_KEY[event.kind], { school: event.schoolName })}
                    </span>
                    <span className='truncate text-xs text-foggy'>{event.studentName}</span>
                  </span>
                  <span className='shrink-0 text-xs text-foggy tabular-nums'>
                    {format.relativeTime(new Date(event.iso))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </ParentDashboardCard>
  );
}
