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
import { EmptyState, FOCUS_RING_INSET } from '@/modules/core';
import { cn } from '@/lib/utils';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { ApplicationLogo } from '@/modules/applications/components/ApplicationTableCells';
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
          <TableRow className='border-b border-divider hover:bg-transparent'>
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
              <TableRow key={`skeleton-${i}`} className='h-16 hover:bg-transparent'>
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='size-9 rounded-full' />
                    <Skeleton className='h-4 w-28' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='size-9 rounded-md' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                </TableCell>
                <TableCell><Skeleton className='h-4 w-14' /></TableCell>
                <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                <TableCell><Skeleton className='h-6 w-24 rounded-pill' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell className='pr-6'><Skeleton className='h-4 w-8' /></TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {applications.map((application) => {
                const initials = `${application.student?.firstName?.[0] ?? ''}${application.student?.lastName?.[0] ?? ''}`.toUpperCase();

                return (
                  <TableRow
                    key={application.documentId}
                    className='group h-16 border-0 hover:bg-gray-50'
                  >
                    <TableCell className='pl-6'>
                      {application.student ? (
                        <Link
                          href={`/dashboard/students/${application.student.documentId}`}
                          className={cn('-mx-2 flex items-center gap-3 rounded-md px-2 py-1', FOCUS_RING_INSET)}
                        >
                          <span className='flex size-9 shrink-0 items-center justify-center rounded-full bg-babu-50 text-xs font-semibold text-babu-700'>
                            {initials}
                          </span>
                          <span className='font-semibold text-ink-900 group-hover:text-babu-600'>
                            {application.student.firstName} {application.student.lastName}
                          </span>
                        </Link>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      <span className='flex items-center gap-3'>
                        <ApplicationLogo name={application.school?.name} />
                        <span className='flex flex-col'>
                          <span className='truncate'>{application.school?.name ?? '—'}</span>
                          {application.school?.cricosCode && (
                            <span className='text-xs text-foggy'>{application.school.cricosCode}</span>
                          )}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {application.school?.state ?? '—'}
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
                <TableRow key={`empty-${i}`} className='h-16 hover:bg-transparent'>
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
