'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, GaugeCircle, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { EmptyState, ErrorState } from '@/modules/core';
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
        <ul className='flex flex-col gap-3'>
          {items.map((item) => (
            <li key={item.documentId}>
              <Link
                href={`/parent/students/${item.documentId}`}
                className='group flex items-center gap-3 rounded-lg px-1 py-1.5 no-underline transition-colors hover:bg-muted'
              >
                <ParentStudentAvatar
                  firstName={item.name.split(' ')[0] ?? ''}
                  lastName={item.name.split(' ').slice(1).join(' ')}
                  photoUrl={item.photoUrl}
                  size={36}
                />
                <span className='flex min-w-0 flex-1 flex-col'>
                  <span className='truncate text-sm font-semibold text-ink-900 group-hover:text-primary-strong'>
                    {item.name}
                  </span>
                  <span className='flex items-center gap-1 text-xs text-foggy'>
                    {item.isComplete ? (
                      <>
                        <CheckCircle2 className='h-3 w-3 text-vivid-mint' aria-hidden='true' />
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
