'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSortHeader, StatusBadge } from '@/modules/design-system';
import { EmptyState } from '@/modules/core';
import { STATUS_STYLES } from '@/modules/students/constants/status.constants';
import type { StudentTableProps, SortField } from '@/modules/students/types/component.types';

const STUDENT_STATUS_TO_TONE: Record<string, NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>> = {
  active: 'trust',
  archived: 'muted',
  enrolled: 'enrolled',
};

export function StudentTable({ students, isLoading, sortField, sortDirection, onSort, pageSize }: StudentTableProps) {
  const t = useTranslations('Students');
  const router = useRouter();

  const rowCount = pageSize || 10;

  if (students.length === 0 && !isLoading) {
    return (
      <EmptyState icon={Users} title={t('emptyTitle')} description={t('emptySubtitle')} />
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
            <DataTableSortHeader
              field='name'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as SortField)}
              label={t('columnName')}
              className='pl-6'
            />
            <DataTableSortHeader
              field='nationality'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as SortField)}
              label={t('columnNationality')}
            />
            <DataTableSortHeader
              field='currentYearLevel'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as SortField)}
              label={t('columnYearLevel')}
            />
            <DataTableSortHeader
              field='targetEntryYear'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as SortField)}
              label={t('columnTargetEntry')}
            />
            <TableHead className='text-xs font-semibold uppercase tracking-wider text-foggy select-none'>
              {t('columnEnglishTest')}
            </TableHead>
            <TableHead className='text-xs font-semibold uppercase tracking-wider text-foggy select-none'>
              {t('columnApps')}
            </TableHead>
            <DataTableSortHeader
              field='status'
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as SortField)}
              label={t('columnStatus')}
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
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell><Skeleton className='h-4 w-14' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                <TableCell><Skeleton className='h-4 w-8' /></TableCell>
                <TableCell className='pr-6'><Skeleton className='h-5 w-16 rounded-full' /></TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {students.map((student) => {
                const style = STATUS_STYLES[student.status] ?? STATUS_STYLES.archived;
                const initials = `${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase();
                const tone = STUDENT_STATUS_TO_TONE[student.status] ?? 'muted';

                return (
                  <TableRow
                    key={student.documentId}
                    className='group h-12 cursor-pointer border-b-border hover:bg-accent/50'
                    onClick={() => router.push(`/dashboard/students/${student.documentId}`)}
                  >
                    <TableCell className='pl-6'>
                      <Link
                        href={`/dashboard/students/${student.documentId}`}
                        className='flex items-center gap-3'
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babu-50 text-xs font-semibold text-babu-600'>
                          {initials}
                        </span>
                        <span className='font-medium text-ink-900 group-hover:text-babu-600'>
                          {student.firstName} {student.lastName}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {student.nationality ?? '—'}
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {student.currentYearLevel ?? '—'}
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {student.targetEntryYear
                        ? `${student.targetEntryYear}${student.targetEntryTerm ? ` · ${student.targetEntryTerm}` : ''}`
                        : '—'}
                    </TableCell>
                    <TableCell className='text-sm text-foggy'>—</TableCell>
                    <TableCell className='text-sm text-foggy'>—</TableCell>
                    <TableCell className='pr-6'>
                      <StatusBadge tone={tone}>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {t(`status${student.status.charAt(0).toUpperCase()}${student.status.slice(1)}`)}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                );
              })}
              {students.length < pageSize && Array.from({ length: pageSize - students.length }).map((_, i) => (
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
