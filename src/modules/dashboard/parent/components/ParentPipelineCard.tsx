'use client';

import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import { EmptyState, ErrorState } from '@/modules/core';
import { cn } from '@/lib/utils';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { useParentDerivedApplications } from '@/modules/dashboard/parent/hooks/useParentDerivedApplications';

export function ParentPipelineCard() {
  const t = useTranslations('ParentDashboard');
  const { pipeline, isLoading, isError, refetch } = useParentDerivedApplications();
  const { segments, total } = pipeline;

  return (
    <ParentDashboardCard
      title={t('pipelineTitle')}
      icon={BarChart3}
      viewAllHref={total > 0 ? '/parent/applications' : undefined}
      viewAllLabel={t('viewAll')}
    >
      {isLoading ? (
        <ParentSummaryRowsSkeleton rows={2} />
      ) : isError ? (
        <ErrorState message={t('pipelineError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      ) : total === 0 ? (
        <EmptyState
          icon={BarChart3}
          title={t('pipelineEmptyTitle')}
          description={t('pipelineEmptySubtitle')}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          <p className='text-sm font-semibold text-ink-900'>{t('pipelineTotal', { count: total })}</p>
          <div
            className='flex h-3 w-full overflow-hidden rounded-pill bg-muted'
            role='img'
            aria-label={t('pipelineTotal', { count: total })}
          >
            {segments.map((segment) => (
              <span
                key={segment.key}
                className={cn('h-full transition-all duration-500 ease-out-quart', segment.barClass)}
                style={{ width: `${(segment.count / total) * 100}%` }}
              />
            ))}
          </div>
          <ul className='grid grid-cols-2 gap-x-4 gap-y-2'>
            {segments.map((segment) => (
              <li key={segment.key} className='flex items-center gap-2 text-sm'>
                <span
                  className={cn('h-2.5 w-2.5 shrink-0 rounded-full', segment.dotClass)}
                  aria-hidden='true'
                />
                <span className='flex-1 truncate text-foggy'>{t(segment.labelKey)}</span>
                <span className='font-semibold text-ink-900 tabular-nums'>{segment.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ParentDashboardCard>
  );
}
