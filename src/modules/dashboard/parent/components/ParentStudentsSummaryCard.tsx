'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap, UserPlus, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/modules/design-system';
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
            <Link href='/parent/students/new' className={cn(buttonVariants(), 'gap-1.5')}>
              <UserPlus className='h-4 w-4' aria-hidden='true' />
              {t('addStudent')}
            </Link>
          }
        />
      ) : (
        <div className='flex flex-col gap-2'>
          <Eyebrow>{t('studentsCount', { count: total })}</Eyebrow>
          <ul className='-mx-3 flex flex-col gap-1'>
            {students.map((student) => (
              <li key={student.documentId}>
                <Link
                  href={`/parent/students/${student.documentId}`}
                  className='group flex items-center gap-4 rounded-xl px-3 py-2.5 no-underline transition-colors duration-200 ease-out-quart hover:bg-muted'
                >
                  <ParentStudentAvatar
                    firstName={student.firstName}
                    lastName={student.lastName}
                    photoUrl={student.photo?.url}
                    size={40}
                  />
                  <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
                    <span className='truncate text-sm font-semibold text-ink-900 transition-colors group-hover:text-primary-strong'>
                      {student.firstName} {student.lastName}
                    </span>
                    {student.targetEntryYear && (
                      <span className='flex items-center gap-1 text-xs text-foggy'>
                        <GraduationCap
                          className='h-3.5 w-3.5 text-foggy'
                          strokeWidth={1.75}
                          aria-hidden='true'
                        />
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
        </div>
      )}
    </ParentDashboardCard>
  );
}
