'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSortHeader } from '@/modules/design-system';
import { EmptyState } from '@/modules/core';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { formatDaysClass, formatSubmittedDate } from '@/modules/applications/lib/format';
import type { ApplicationTableProps, ApplicationSortField } from '@/modules/applications/types/component.types';

export function ApplicationTable({
  applications,
  isLoading,
  sortField,
  sortDirection,
  onSort,
  pageSize,
}: ApplicationTableProps) {
  const t = useTranslations('Applications');
  const locale = useLocale();

  const rowCount = pageSize || 10;

  if (applications.length === 0 && !isLoading) {
    return (
      <EmptyState
        icon={FileText}
        title={t('emptyTitle')}
        description={t('emptySubtitle')}
      />
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
            <DataTableSortHeader
              field='student'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnStudent')}
              className='pl-6'
            />
            <DataTableSortHeader
              field='school'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnSchool')}
            />
            <DataTableSortHeader
              field='state'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnState')}
            />
            <DataTableSortHeader
              field='targetYearLevel'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnYearLevel')}
            />
            <DataTableSortHeader
              field='status'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnStatus')}
            />
            <DataTableSortHeader
              field='submittedAt'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnSubmitted')}
            />
            <DataTableSortHeader
              field='daysInStatus'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ApplicationSortField)}
              label={t('columnDays')}
              className='pr-6'
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={`skeleton-${i}`} className='h-12 hover:bg-transparent'>
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <Skeleton className='h-4 w-28' />
                  </div>
                </TableCell>
                <TableCell><Skeleton className='h-4 w-32' /></TableCell>
                <TableCell><Skeleton className='h-4 w-14' /></TableCell>
                <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                <TableCell><Skeleton className='h-5 w-24 rounded-full' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell className='pr-6'><Skeleton className='h-4 w-8' /></TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {applications.map((application) => {
                const initials = `${application.student.firstName?.[0] ?? ''}${application.student.lastName?.[0] ?? ''}`.toUpperCase();

                return (
                  <TableRow
                    key={application.documentId}
                    className='group h-12 border-b-border hover:bg-accent/50'
                  >
                    <TableCell className='pl-6'>
                      <Link
                        href={`/dashboard/students/${application.student.documentId}`}
                        className='flex items-center gap-3'
                      >
                        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babu-50 text-xs font-semibold text-babu-600'>
                          {initials}
                        </span>
                        <span className='font-medium text-ink-900 group-hover:text-babu-600'>
                          {application.student.firstName} {application.student.lastName}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      <div>{application.school.name}</div>
                      {application.school.cricosCode && (
                        <div className='text-xs text-foggy'>{application.school.cricosCode}</div>
                      )}
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {application.school.state ?? '—'}
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {application.targetYearLevel ?? '—'}
                    </TableCell>
                    <TableCell>
                      <ApplicationStatusBadge status={application.status} />
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {formatSubmittedDate(application.submittedAt, t, locale)}
                    </TableCell>
                    <TableCell className={`pr-6 text-sm font-medium ${formatDaysClass(application.daysInStatus)}`}>
                      {application.daysInStatus}
                    </TableCell>
                  </TableRow>
                );
              })}
              {applications.length < pageSize && Array.from({ length: pageSize - applications.length }).map((_, i) => (
                <TableRow key={`empty-${i}`} className='h-12 hover:bg-transparent'>
                  <TableCell colSpan={7} />
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
