'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { EmptyState, ErrorState } from '@/modules/core';
import {
  ApplicationStatusBadge,
  useParentApplications,
  type ParentApplication,
} from '@/modules/applications';

function ApplicationRow({ application, viewLabel }: { application: ParentApplication; viewLabel: string }) {
  return (
    <li className='flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/40 p-4'>
      <div className='flex min-w-0 flex-col gap-1.5'>
        <span className='truncate text-sm font-medium text-ink-900'>{application.school.name}</span>
        <ApplicationStatusBadge status={application.status} />
      </div>
      <Link
        href={`/parent/applications/${application.documentId}`}
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
      >
        {viewLabel}
      </Link>
    </li>
  );
}

export function ParentStudentApplications({ studentDocumentId }: { studentDocumentId: string }) {
  const t = useTranslations('ParentStudents');
  const { data, isLoading, isError, refetch } = useParentApplications({
    student: studentDocumentId,
    pageSize: 5,
  });

  if (isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-20 w-full rounded-lg' />
        <Skeleton className='h-20 w-full rounded-lg' />
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={t('applicationsError')} onRetry={() => refetch()} retryLabel={t('retry')} framed />;
  }

  const applications = data?.data ?? [];

  if (applications.length === 0) {
    return <EmptyState icon={GraduationCap} title={t('applicationsEmpty')} framed />;
  }

  return (
    <ul className='flex flex-col gap-3'>
      {applications.map((application) => (
        <ApplicationRow key={application.documentId} application={application} viewLabel={t('viewApplication')} />
      ))}
    </ul>
  );
}
