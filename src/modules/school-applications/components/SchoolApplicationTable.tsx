'use client';

import { useTranslations } from 'next-intl';
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
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { SchoolStatusBadge } from '@/modules/school-applications/components/SchoolStatusBadge';
import {
  computeDaysColor,
  daysColorClass,
  studentDisplayName,
} from '@/modules/school-applications/lib/school-application';
import type { SchoolApplicationListItem } from '@/modules/school-applications/types/school-applications.types';

interface Props {
  applications: SchoolApplicationListItem[];
  isLoading: boolean;
}

function fmtDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function SchoolApplicationTable({ applications, isLoading }: Props) {
  const t = useTranslations('SchoolApplications');

  if (!isLoading && applications.length === 0) {
    return (
      <div className='p-4'>
        <EmptyState framed icon={FileText} title={t('empty')} description={t('emptyHint')} />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-divider hover:bg-transparent'>
          <TableHead className='pl-5 text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStudent')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnAgent')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnProgramme')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStatus')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnSubmitted')}</TableHead>
          <TableHead className='pr-5 text-right text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnDays')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={`s-${i}`} className='h-14'>
                <TableCell className='pl-5'><Skeleton className='h-4 w-32' /></TableCell>
                <TableCell><Skeleton className='h-4 w-28' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell><Skeleton className='h-5 w-24 rounded-full' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell className='pr-5'><Skeleton className='ml-auto h-4 w-8' /></TableCell>
              </TableRow>
            ))
          : applications.map((app) => {
              const color = computeDaysColor(app.daysInStatus);
              return (
                <TableRow key={app.documentId} className='group h-14 hover:bg-muted'>
                  <TableCell className='pl-5 py-3.5'>
                    <Link
                      href={`/dashboard/applications/${app.documentId}`}
                      className='rounded-md font-semibold text-ink-900 no-underline hover:text-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    >
                      {studentDisplayName(
                        app.student ? { firstName: app.student.name, lastName: '' } : null,
                      )}
                    </Link>
                    {app.student?.nationality && (
                      <div className='text-xs text-foggy'>{app.student.nationality}</div>
                    )}
                  </TableCell>
                  <TableCell className='py-3.5 text-sm text-foggy'>
                    {app.agent?.name ?? app.agent?.companyName ?? '—'}
                  </TableCell>
                  <TableCell className='py-3.5 text-sm text-foggy'>{app.targetYearLevel ?? '—'}</TableCell>
                  <TableCell className='py-3.5'><SchoolStatusBadge status={app.status} /></TableCell>
                  <TableCell className='py-3.5 text-sm text-foggy'>{fmtDate(app.submittedAt)}</TableCell>
                  <TableCell className={`pr-5 py-3.5 text-right text-sm font-semibold tabular-nums ${daysColorClass(color)}`}>
                    {app.daysInStatus}
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
}
