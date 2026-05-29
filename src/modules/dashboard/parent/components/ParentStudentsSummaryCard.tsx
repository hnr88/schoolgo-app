'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, UserPlus, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState } from '@/modules/core';
import { ParentStudentAvatar, useParentStudents } from '@/modules/students';
import { ParentDashboardCard } from '@/modules/dashboard/parent/components/ParentDashboardCard';
import { ParentSummaryRowsSkeleton } from '@/modules/dashboard/parent/components/ParentSummaryStates';
import { PARENT_DASHBOARD_RECENT_LIMIT } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

export function ParentStudentsSummaryCard() {
  const t = useTranslations('ParentDashboard');
  const { data, isLoading, isError, refetch } = useParentStudents({
    pageSize: PARENT_DASHBOARD_RECENT_LIMIT,
  });

  const students = data?.data ?? [];
  const total = data?.meta?.pagination?.total ?? students.length;

  return (
    <ParentDashboardCard
      title={t('studentsTitle')}
      icon={Users}
      viewAllHref={students.length > 0 ? '/parent/students' : undefined}
      viewAllLabel={t('viewAll')}
    >
      {isLoading ? (
        <ParentSummaryRowsSkeleton />
      ) : isError ? (
        <ErrorState message={t('studentsError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      ) : students.length === 0 ? (
        <EmptyState
          icon={Users}
          title={t('studentsEmptyTitle')}
          description={t('studentsEmptySubtitle')}
          action={
            <Link href='/parent/students/new'>
              <Button className='gap-1.5'>
                <UserPlus className='h-4 w-4' aria-hidden='true' />
                {t('addStudent')}
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <p className='border-b border-divider px-5 py-3 text-sm text-foggy'>
            {t('studentsCount', { count: total })}
          </p>
          <ul className='flex flex-col divide-y divide-divider'>
            {students.map((student) => (
              <li key={student.documentId}>
                <Link
                  href={`/parent/students/${student.documentId}`}
                  className='group flex items-center gap-3 px-5 py-4 no-underline transition-colors hover:bg-muted'
                >
                  <ParentStudentAvatar
                    firstName={student.firstName}
                    lastName={student.lastName}
                    photoUrl={student.photo?.url}
                    size={36}
                  />
                  <span className='flex min-w-0 flex-1 flex-col'>
                    <span className='truncate text-sm font-semibold text-ink-900 group-hover:text-primary'>
                      {student.firstName} {student.lastName}
                    </span>
                    {student.targetEntryYear && (
                      <span className='flex items-center gap-1 text-xs text-foggy'>
                        <GraduationCap className='h-3 w-3' aria-hidden='true' />
                        {t('targetEntry', {
                          term: student.targetEntryTerm ?? '',
                          year: student.targetEntryYear,
                        })}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </ParentDashboardCard>
  );
}
