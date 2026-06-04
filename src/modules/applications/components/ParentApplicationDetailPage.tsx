'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useParentApplication } from '@/modules/applications/queries/use-parent-application.query';
import { ParentApplicationHeader } from '@/modules/applications/components/ParentApplicationHeader';
import { ParentApplicationDetailBody } from '@/modules/applications/components/ParentApplicationDetailBody';
import type { ParentApplicationDetailProps } from '@/modules/applications/types/parent-component.types';

function DetailSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-5 w-40' />
      <Skeleton className='h-48 w-full rounded-lg' />
      <div className='grid gap-6 lg:grid-cols-2'>
        <Skeleton className='h-56 w-full rounded-lg' />
        <Skeleton className='h-56 w-full rounded-lg' />
      </div>
    </div>
  );
}

export function ParentApplicationDetailPage({ documentId }: ParentApplicationDetailProps) {
  const t = useTranslations('ParentApplications');
  const { data: application, isLoading, isError, error } = useParentApplication(documentId);

  if (
    isError &&
    error &&
    'response' in error &&
    (error as { response?: { status?: number } }).response?.status === 404
  ) {
    notFound();
  }

  const backLink = (
    <Link
      href='/parent/applications'
      className='inline-flex items-center gap-1 text-sm font-medium text-primary-strong hover:underline'
    >
      <ArrowLeft className='h-4 w-4' />
      {t('backToList')}
    </Link>
  );

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !application) {
    return (
      <div className='flex flex-col gap-6'>
        {backLink}
        <p className='text-sm text-foggy'>{t('loadError')}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {backLink}
      <ParentApplicationHeader application={application} />
      <ParentApplicationDetailBody application={application} />
    </div>
  );
}
