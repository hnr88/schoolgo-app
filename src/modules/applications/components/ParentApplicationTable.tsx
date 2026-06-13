'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
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
import { DataTableShell, EmptyState, FOCUS_RING_INSET } from '@/modules/core';
import { cn } from '@/lib/utils';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { ParentApplicationTableSkeletonRows } from '@/modules/applications/components/ParentApplicationTableSkeleton';
import { ApplicationAvatar, ApplicationLogo } from '@/modules/applications/components/ApplicationTableCells';
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
  const rowCount = pageSize || 10;

  if (applications.length === 0 && !isLoading) {
    return (
      <EmptyState icon={FileText} title={t('noResultsTitle')} description={t('noResultsSubtitle')} framed />
    );
  }

  const sortHeaders: { field: ParentApplicationSortField; label: string }[] = [
    { field: 'student', label: t('columnStudent') },
    { field: 'school', label: t('columnSchool') },
    { field: 'status', label: t('columnStatus') },
    { field: 'submittedAt', label: t('columnSubmitted') },
  ];

  return (
    <DataTableShell>
      <Table>
        <TableHeader>
          <TableRow>
            {sortHeaders.map((header) => (
              <DataTableSortHeader
                key={header.field}
                field={header.field}
                activeField={sortField}
                direction={sortDirection}
                onSort={(field) => onSort(field as ParentApplicationSortField)}
                label={header.label}
              />
            ))}
            <TableHead className={HEADER_CLASS}>{t('columnOffer')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? <ParentApplicationTableSkeletonRows rowCount={rowCount} />
            : applications.map((application) => {
                const offerFee = formatOfferFee(application.offerAnnualFee, locale);
                const offerDeadline = formatDate(application.offerDeadline, locale);
                return (
                  <TableRow key={application.documentId}>
                    <TableCell>
                      <Link
                        href={`/parent/applications/${application.documentId}`}
                        className={cn('-mx-2 flex items-center gap-3 rounded-md px-2 py-1', FOCUS_RING_INSET)}
                      >
                        <ApplicationAvatar
                          firstName={application.student.firstName}
                          lastName={application.student.lastName}
                        />
                        <span className='truncate font-semibold text-ink-900'>
                          {application.student.firstName} {application.student.lastName}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className='flex items-center gap-3'>
                        <ApplicationLogo name={application.school.name} />
                        <span className='truncate text-sm text-hof'>{application.school.name}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <ApplicationStatusBadge status={application.status} />
                    </TableCell>
                    <TableCell className='text-sm text-hof'>
                      {formatDate(application.submittedAt, locale) ?? '—'}
                    </TableCell>
                    <TableCell className='text-sm'>
                      {offerFee ? (
                        <div className='flex flex-col gap-0.5'>
                          <span className='font-semibold text-ink-900'>{t('offerFeePerYear', { fee: offerFee })}</span>
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
    </DataTableShell>
  );
}
