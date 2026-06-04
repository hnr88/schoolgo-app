'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableSortHeader } from '@/modules/design-system';
import { EmptyState } from '@/modules/core';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { ParentApplicationTableSkeletonRows } from '@/modules/applications/components/ParentApplicationTableSkeleton';
import { HEADER_CLASS } from '@/modules/applications/constants/table.constants';
import { formatDate, formatOfferFee } from '@/modules/applications/lib/parent-format';
import type {
  ParentApplicationTableProps,
  ParentApplicationSortField,
} from '@/modules/applications/types/parent-component.types';

export function ParentApplicationTable({
  applications,
  isLoading,
  sortField,
  sortDirection,
  onSort,
  pageSize,
}: ParentApplicationTableProps) {
  const t = useTranslations('ParentApplications');
  const locale = useLocale();
  const router = useRouter();
  const rowCount = pageSize || 10;

  if (applications.length === 0 && !isLoading) {
    return (
      <EmptyState icon={FileText} title={t('noResultsTitle')} description={t('noResultsSubtitle')} framed />
    );
  }

  const sortHeaders: { field: ParentApplicationSortField; label: string; className?: string }[] = [
    { field: 'student', label: t('columnStudent'), className: 'pl-6' },
    { field: 'school', label: t('columnSchool') },
    { field: 'status', label: t('columnStatus') },
    { field: 'submittedAt', label: t('columnSubmitted') },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
          {sortHeaders.map((header) => (
            <DataTableSortHeader
              key={header.field}
              field={header.field}
              activeField={sortField}
              direction={sortDirection}
              onSort={(field) => onSort(field as ParentApplicationSortField)}
              label={header.label}
              className={header.className}
            />
          ))}
          <TableHead className={`${HEADER_CLASS} pr-6`}>{t('columnOffer')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? <ParentApplicationTableSkeletonRows rowCount={rowCount} />
          : applications.map((application) => {
              const offerFee = formatOfferFee(application.offerAnnualFee, locale);
              const offerDeadline = formatDate(application.offerDeadline, locale);
              return (
                <TableRow
                  key={application.documentId}
                  className='group h-14 cursor-pointer border-b-border hover:bg-accent/50'
                  onClick={() => router.push(`/parent/applications/${application.documentId}`)}
                >
                  <TableCell className='pl-6'>
                    <Link
                      href={`/parent/applications/${application.documentId}`}
                      className='font-medium text-ink-900 group-hover:text-babu-600'
                      onClick={(event) => event.stopPropagation()}
                    >
                      {application.student.firstName} {application.student.lastName}
                    </Link>
                  </TableCell>
                  <TableCell className='text-sm text-hof'>{application.school.name}</TableCell>
                  <TableCell>
                    <ApplicationStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className='text-sm text-hof'>
                    {formatDate(application.submittedAt, locale) ?? '—'}
                  </TableCell>
                  <TableCell className='pr-6 text-sm'>
                    {offerFee ? (
                      <div className='flex flex-col gap-0.5'>
                        <span className='font-medium text-ink-900'>{t('offerFeePerYear', { fee: offerFee })}</span>
                        {offerDeadline && (
                          <span className='text-xs text-foggy'>{t('offerByDate', { date: offerDeadline })}</span>
                        )}
                      </div>
                    ) : (
                      <span className='text-foggy'>—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
}
