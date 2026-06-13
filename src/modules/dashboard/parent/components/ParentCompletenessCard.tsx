'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, GaugeCircle, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState, ErrorState, FOCUS_RING } from '@/modules/core';
import { ParentStudentAvatar } from '@/modules/students';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentCompletenessRing } from '@/modules/dashboard/parent/components/ParentCompletenessRing';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { useParentCompleteness } from '@/modules/dashboard/parent/hooks/useParentCompleteness';

export function ParentCompletenessCard() {
  const t = useTranslations('ParentDashboard');
  const { items, isLoading, isError, refetch } = useParentCompleteness();

  return (
    <ParentDashboardCard title={t('completenessTitle')} icon={GaugeCircle}>
      {isLoading ? (
        <ParentSummaryRowsSkeleton rows={2} />
      ) : isError ? (
        <ErrorState
          message={t('completenessError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Users}
          title={t('completenessEmptyTitle')}
          description={t('completenessEmptySubtitle')}
        />
      ) : (
        <ul className='-mx-2 flex flex-col gap-1'>
          {items.map((item) => (
            <li key={item.documentId}>
              <Link
                href={`/parent/students/${item.documentId}`}
                className={cn(
                  'group flex items-center gap-4 rounded-xl px-2 py-4 no-underline transition-colors duration-200 ease-out-quart hover:bg-gray-50',
                  FOCUS_RING,
                )}
              >
                <ParentStudentAvatar
                  firstName={item.name.split(' ')[0] ?? ''}
                  lastName={item.name.split(' ').slice(1).join(' ')}
                  photoUrl={item.photoUrl}
                  size={40}
                />
                <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
                  <span className='truncate text-sm font-semibold text-ink-900 transition-colors group-hover:text-primary-strong'>
                    {item.name}
                  </span>
                  <span className='flex items-center gap-1 text-xs text-foggy'>
                    {item.isComplete ? (
                      <>
                        <CheckCircle2
                          className='h-3.5 w-3.5 text-vivid-mint'
                          strokeWidth={2}
                          aria-hidden='true'
                        />
                        {t('completenessComplete')}
                      </>
                    ) : (
                      t('completenessFieldsDone', { completed: item.completed, total: item.total })
                    )}
                  </span>
                </span>
                <ParentCompletenessRing
                  percent={item.percent}
                  isComplete={item.isComplete}
                  label={t('completenessPercent', { percent: item.percent })}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </ParentDashboardCard>
  );
}
