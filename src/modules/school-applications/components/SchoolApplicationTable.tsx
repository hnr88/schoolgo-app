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
    return <EmptyState icon={FileText} title={t('empty')} description={t('emptyHint')} />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
          <TableHead className='pl-6'>{t('columnStudent')}</TableHead>
          <TableHead>{t('columnAgent')}</TableHead>
          <TableHead>{t('columnProgramme')}</TableHead>
          <TableHead>{t('columnStatus')}</TableHead>
          <TableHead>{t('columnSubmitted')}</TableHead>
          <TableHead className='pr-6 text-right'>{t('columnDays')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={`s-${i}`} className='h-14'>
                <TableCell className='pl-6'><Skeleton className='h-4 w-32' /></TableCell>
                <TableCell><Skeleton className='h-4 w-28' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell><Skeleton className='h-5 w-24 rounded-full' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell className='pr-6'><Skeleton className='ml-auto h-4 w-8' /></TableCell>
              </TableRow>
            ))
          : applications.map((app) => {
              const color = computeDaysColor(app.daysInStatus);
              return (
                <TableRow key={app.documentId} className='group h-14 border-b-border hover:bg-accent/50'>
                  <TableCell className='pl-6'>
                    <Link
                      href={`/dashboard/applications/${app.documentId}`}
                      className='font-medium text-ink-900 hover:text-babu-600'
                    >
                      {studentDisplayName(
                        app.student ? { firstName: app.student.name, lastName: '' } : null,
                      )}
                    </Link>
                    {app.student?.nationality && (
                      <div className='text-xs text-foggy'>{app.student.nationality}</div>
                    )}
                  </TableCell>
                  <TableCell className='text-sm text-hof'>
                    {app.agent?.name ?? app.agent?.companyName ?? '—'}
                  </TableCell>
                  <TableCell className='text-sm text-hof'>{app.targetYearLevel ?? '—'}</TableCell>
                  <TableCell><SchoolStatusBadge status={app.status} /></TableCell>
                  <TableCell className='text-sm text-hof'>{fmtDate(app.submittedAt)}</TableCell>
                  <TableCell className={`pr-6 text-right text-sm font-medium ${daysColorClass(color)}`}>
                    {app.daysInStatus}
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
}
