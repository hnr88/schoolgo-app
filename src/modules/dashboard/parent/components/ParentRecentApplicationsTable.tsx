'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight, FileText, Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState, ErrorState } from '@/modules/core';
import { ApplicationStatusBadge, useParentApplications } from '@/modules/applications';
import { ParentApplicationsTableSkeleton } from '@/modules/dashboard/parent/components/ParentApplicationsTableSkeleton';
import { ParentSectionHeader } from '@/modules/dashboard/parent/components/ParentSectionHeader';
import { PARENT_DASHBOARD_RECENT_LIMIT } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import { useActiveChildStore } from '@/modules/students';

export function ParentRecentApplicationsTable() {
  const t = useTranslations('ParentDashboard');
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const { data, isLoading, isError, refetch } = useParentApplications({
    pageSize: PARENT_DASHBOARD_RECENT_LIMIT,
    student: activeChildId ?? undefined,
  });

  const applications = data?.data ?? [];
  const hasRows = applications.length > 0;

  return (
    <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2'>
      <ParentSectionHeader
        title={t('recentApplicationsTitle')}
        icon={FileText}
        viewAllHref={hasRows ? '/parent/applications' : undefined}
        viewAllLabel={t('viewAll')}
      />

      {isError ? (
        <ErrorState
          message={t('applicationsError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      ) : !isLoading && !hasRows ? (
        <EmptyState
          icon={FileText}
          title={t('applicationsEmptyTitle')}
          description={t('applicationsEmptySubtitle')}
          action={
            <Link
              href='/parent/search'
              className={cn(buttonVariants({ variant: 'outline' }), 'gap-1.5')}
            >
              <Search className='h-4 w-4' aria-hidden='true' />
              {t('searchSchools')}
            </Link>
          }
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='px-5 text-xs font-semibold uppercase tracking-wide text-foggy'>
                {t('tableChild')}
              </TableHead>
              <TableHead className='px-5 text-xs font-semibold uppercase tracking-wide text-foggy'>
                {t('tableSchool')}
              </TableHead>
              <TableHead className='px-5 text-xs font-semibold uppercase tracking-wide text-foggy'>
                {t('tableStatus')}
              </TableHead>
              <TableHead className='px-5'>
                <span className='sr-only'>{t('tableView')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <ParentApplicationsTableSkeleton />
          ) : (
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.documentId} className='group'>
                  <TableCell className='px-5 py-3.5 font-semibold text-ink-900'>
                    {application.student.firstName} {application.student.lastName}
                  </TableCell>
                  <TableCell className='max-w-0 truncate px-5 py-3.5 text-foggy'>
                    {application.school.name}
                  </TableCell>
                  <TableCell className='px-5 py-3.5'>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className='px-5 py-3.5 text-right'>
                    <Link
                      href={`/parent/applications/${application.documentId}`}
                      className='inline-flex items-center gap-1 text-sm font-semibold text-primary-strong no-underline hover:underline'
                      aria-label={t('tableViewApplication', {
                        name: `${application.student.firstName} ${application.student.lastName}`,
                      })}
                    >
                      {t('tableView')}
                      <ChevronRight className='h-3.5 w-3.5' strokeWidth={2} aria-hidden='true' />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}
    </section>
  );
}
