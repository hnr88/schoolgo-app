'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { Users, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { STATUS_STYLES } from '@/modules/students/constants/status.constants';
import type { StudentTableProps, SortField, SortIconProps } from '@/modules/students/types/component.types';

const HEADER_CLASS = 'text-xs font-semibold uppercase tracking-wider text-foggy select-none';

function SortIcon({ field, activeField, direction }: SortIconProps) {
  if (activeField !== field) return <ArrowUpDown className='ml-1 h-3 w-3 text-quill' />;
  if (direction === 'asc') return <ArrowUp className='ml-1 h-3 w-3 text-primary' />;
  return <ArrowDown className='ml-1 h-3 w-3 text-primary' />;
}

export function StudentTable({ students, isLoading, sortField, sortDirection, onSort, pageSize }: StudentTableProps) {
  const t = useTranslations('Students');
  const router = useRouter();

  function renderSortableHead(field: SortField, label: string, className?: string) {
    const isActive = sortField === field;

    return (
      <TableHead
        className={`${HEADER_CLASS} ${className ?? ''}`}
        aria-sort={isActive ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <button
          type='button'
          className='inline-flex items-center rounded-sm text-left hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          onClick={() => onSort(field)}
        >
          {label}
          <SortIcon field={field} activeField={sortField} direction={sortDirection} />
        </button>
      </TableHead>
    );
  }

  const rowCount = pageSize || 10;

  if (students.length === 0 && !isLoading) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-muted'>
          <Users className='h-6 w-6 text-foggy' />
        </div>
        <p className='mt-4 text-sm font-medium text-ink-900'>{t('emptyTitle')}</p>
        <p className='mt-1 text-xs text-foggy'>{t('emptySubtitle')}</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
            {renderSortableHead('name', t('columnName'), 'pl-6')}
            {renderSortableHead('nationality', t('columnNationality'))}
            {renderSortableHead('currentYearLevel', t('columnYearLevel'))}
            {renderSortableHead('targetEntryYear', t('columnTargetEntry'))}
            <TableHead className={HEADER_CLASS}>{t('columnEnglishTest')}</TableHead>
            <TableHead className={HEADER_CLASS}>{t('columnApps')}</TableHead>
            {renderSortableHead('status', t('columnStatus'), 'pr-6')}
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

                return (
                  <TableRow
                    key={student.documentId}
                    className='group h-12 cursor-pointer border-b-border hover:bg-babu-50/50'
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
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {t(`status${student.status.charAt(0).toUpperCase()}${student.status.slice(1)}`)}
                      </span>
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
