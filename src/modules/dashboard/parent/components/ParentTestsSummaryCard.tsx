'use client';

import { useTranslations } from 'next-intl';
import { ClipboardCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { EmptyState, ErrorState, StatusBadge } from '@/modules/core';
import { useParentStudents } from '@/modules/students';
import { VERIFICATION_STATUS_STYLES } from '@/modules/test-results';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import {
  testTypeLabelKey,
  verificationLabelKey,
} from '@/modules/dashboard/parent/lib/test-summary-labels';
import { PARENT_DASHBOARD_RECENT_LIMIT } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

export function ParentTestsSummaryCard() {
  const t = useTranslations('ParentDashboard');
  const tResults = useTranslations('ParentTestResults');
  const { data, isLoading, isError, refetch } = useParentStudents({
    pageSize: PARENT_DASHBOARD_RECENT_LIMIT,
  });

  const withTests = (data?.data ?? []).filter((student) => student.englishTestSummary !== null);

  return (
    <ParentDashboardCard
      title={t('testsTitle')}
      icon={ClipboardCheck}
      viewAllHref={withTests.length > 0 ? '/parent/results' : undefined}
      viewAllLabel={t('viewAll')}
    >
      {isLoading ? (
        <ParentSummaryRowsSkeleton />
      ) : isError ? (
        <ErrorState message={t('testsError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      ) : withTests.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title={t('testsEmptyTitle')}
          description={t('testsEmptySubtitle')}
        />
      ) : (
        <ul className='flex flex-col divide-y divide-divider'>
          {withTests.map((student) => {
            const summary = student.englishTestSummary!;
            return (
              <li key={student.documentId}>
                <Link
                  href={{ pathname: '/parent/results', query: { student: student.documentId } }}
                  className='group flex items-center gap-3 px-5 py-3.5 no-underline transition-colors hover:bg-muted'
                >
                  <span className='flex min-w-0 flex-1 flex-col'>
                    <span className='truncate text-sm font-semibold text-ink-900 group-hover:text-primary-strong'>
                      {student.firstName} {student.lastName}
                    </span>
                    <span className='text-xs text-foggy'>
                      {tResults(testTypeLabelKey(summary.testType))}
                      {summary.overallScore ? ` · ${summary.overallScore}` : ''}
                    </span>
                  </span>
                  <StatusBadge
                    status={summary.verificationStatus}
                    label={tResults(verificationLabelKey(summary.verificationStatus))}
                    styles={VERIFICATION_STATUS_STYLES}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </ParentDashboardCard>
  );
}
