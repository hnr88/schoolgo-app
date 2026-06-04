'use client';

import { useTranslations } from 'next-intl';
import { FileText, Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { ParentStudentAvatar } from '@/modules/students';
import { ApplicationStatusBadge, useParentApplications } from '@/modules/applications';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { PARENT_DASHBOARD_RECENT_LIMIT } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

export function ParentApplicationsSummaryCard() {
  const t = useTranslations('ParentDashboard');
  const { data, isLoading, isError, refetch } = useParentApplications({
    pageSize: PARENT_DASHBOARD_RECENT_LIMIT,
  });

  const applications = data?.data ?? [];

  return (
    <ParentDashboardCard
      title={t('applicationsTitle')}
      icon={FileText}
      viewAllHref={applications.length > 0 ? '/parent/applications' : undefined}
      viewAllLabel={t('viewAll')}
    >
      {isLoading ? (
        <ParentSummaryRowsSkeleton />
      ) : isError ? (
        <ErrorState
          message={t('applicationsError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={t('applicationsEmptyTitle')}
          description={t('applicationsEmptySubtitle')}
          action={
            <Link href='/parent/search'>
              <Button variant='outline' className='gap-1.5'>
                <Search className='h-4 w-4' aria-hidden='true' />
                {t('searchSchools')}
              </Button>
            </Link>
          }
        />
      ) : (
        <ul className='-mx-3 flex flex-col gap-1'>
          {applications.map((application) => (
            <li key={application.documentId}>
              <Link
                href={`/parent/applications/${application.documentId}`}
                className='group flex items-center gap-4 rounded-xl px-3 py-2.5 no-underline transition-colors duration-200 ease-out-quart hover:bg-muted'
              >
                <ParentStudentAvatar
                  firstName={application.student.firstName}
                  lastName={application.student.lastName}
                  photoUrl={null}
                  size={40}
                />
                <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
                  <span className='truncate text-sm font-semibold text-ink-900 transition-colors group-hover:text-primary-strong'>
                    {application.student.firstName} {application.student.lastName}
                  </span>
                  <span className='truncate text-xs text-foggy'>{application.school.name}</span>
                </span>
                <ApplicationStatusBadge status={application.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </ParentDashboardCard>
  );
}
