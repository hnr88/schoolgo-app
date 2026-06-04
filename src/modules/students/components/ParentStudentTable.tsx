'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSortHeader } from '@/modules/design-system';
import { EmptyState, StatusBadge } from '@/modules/core';
import {
  VERIFICATION_STATUS_LABELS,
  VERIFICATION_STATUS_STYLES,
  type VerificationStatus,
} from '@/modules/test-results';
import { ParentStudentAvatar } from '@/modules/students/components/ParentStudentAvatar';
import { HEADER_CLASS } from '@/modules/students/constants/profile.constants';
import type { ParentStudentTableProps, ParentSortField } from '@/modules/students/types/parent-component.types';

export function ParentStudentTable({
  students,
  isLoading,
  sortField,
  sortDirection,
  onSort,
  pageSize,
}: ParentStudentTableProps) {
  const t = useTranslations('ParentStudents');
  const tResults = useTranslations('ParentTestResults');
  const rowCount = pageSize || 10;

  if (students.length === 0 && !isLoading) {
    return <EmptyState icon={Users} title={t('noResultsTitle')} description={t('noResultsSubtitle')} framed />;
  }

  const sortFields: { field: ParentSortField; label: string; className?: string }[] = [
    { field: 'name', label: t('columnName'), className: 'pl-6' },
    { field: 'nationality', label: t('columnNationality') },
    { field: 'currentYearLevel', label: t('columnYearLevel') },
    { field: 'targetEntryYear', label: t('columnTargetEntry') },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
          {sortFields.map((f) => (
            <DataTableSortHeader
              key={f.field}
              field={f.field}
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ParentSortField)}
              label={f.label}
              className={f.className}
            />
          ))}
          <TableHead className={HEADER_CLASS}>{t('columnEnglishTest')}</TableHead>
          <TableHead className={`${HEADER_CLASS} pr-6`}>{t('columnApps')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={`skeleton-${i}`} className='h-14 hover:bg-transparent'>
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
                <TableCell className='pr-6'><Skeleton className='h-4 w-8' /></TableCell>
              </TableRow>
            ))
          : students.map((student) => (
              <TableRow
                key={student.documentId}
                className='group h-14 border-b-border transition-colors duration-200 ease-out-quart hover:bg-accent/50'
              >
                <TableCell className='pl-6'>
                  <Link
                    href={`/parent/students/${student.documentId}`}
                    className='-mx-1 inline-flex items-center gap-3 rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  >
                    <ParentStudentAvatar firstName={student.firstName} lastName={student.lastName} photoUrl={student.photo?.url} />
                    <span className='font-medium text-ink-900 transition-colors duration-200 ease-out-quart group-hover:text-babu-600'>
                      {student.firstName} {student.lastName}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className='text-sm text-hof'>{student.nationality ?? '—'}</TableCell>
                <TableCell className='text-sm text-hof'>{student.currentYearLevel ?? '—'}</TableCell>
                <TableCell className='text-sm text-hof'>
                  {student.targetEntryYear
                    ? `${student.targetEntryYear}${student.targetEntryTerm ? ` · ${student.targetEntryTerm}` : ''}`
                    : '—'}
                </TableCell>
                <TableCell className='text-sm'>
                  {student.englishTestSummary ? (
                    <StatusBadge
                      status={student.englishTestSummary.verificationStatus}
                      styles={VERIFICATION_STATUS_STYLES}
                      label={`${student.englishTestSummary.testType.toUpperCase()}${
                        student.englishTestSummary.overallScore ? ` · ${student.englishTestSummary.overallScore}` : ''
                      } · ${tResults(
                        VERIFICATION_STATUS_LABELS[student.englishTestSummary.verificationStatus as VerificationStatus] ??
                          VERIFICATION_STATUS_LABELS.unverified,
                      )}`}
                    />
                  ) : (
                    <span className='text-foggy'>—</span>
                  )}
                </TableCell>
                <TableCell className='pr-6 text-sm text-hof'>{student.activeApplicationCount}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
