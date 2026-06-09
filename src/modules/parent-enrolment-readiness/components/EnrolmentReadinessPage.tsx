'use client';

import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { ReadinessApplicationCard } from '@/modules/parent-enrolment-readiness/components/ReadinessApplicationCard';
import { groupReadinessItems } from '@/modules/parent-enrolment-readiness/lib/group-readiness';
import { useEnrolmentReadiness } from '@/modules/parent-enrolment-readiness/queries/use-enrolment-readiness.query';

function ReadinessSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {[0, 1].map((index) => (
        <SurfaceCard key={index} padding='lg' className='flex flex-col gap-3'>
          <Skeleton className='h-5 w-1/2' />
          <Skeleton className='h-2 w-full rounded-full' />
          {[0, 1, 2].map((row) => (
            <div key={row} className='flex items-center justify-between gap-3'>
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-5 w-20 rounded-full' />
            </div>
          ))}
        </SurfaceCard>
      ))}
    </div>
  );
}

export function EnrolmentReadinessPage() {
  const t = useTranslations('ParentEnrolmentReadiness');
  const readinessQuery = useEnrolmentReadiness();
  const groups = groupReadinessItems(readinessQuery.data ?? []);

  return (
    <div className='flex flex-col gap-4'>
      <SectionHeading title={t('title')} description={t('subtitle')} />
      {readinessQuery.isLoading ? (
        <ReadinessSkeleton />
      ) : readinessQuery.isError ? (
        <ErrorState
          framed
          message={t('loadError')}
          onRetry={() => readinessQuery.refetch()}
          retryLabel={t('retry')}
        />
      ) : groups.length === 0 ? (
        <EmptyState icon={ListChecks} title={t('empty')} description={t('emptyDescription')} framed />
      ) : (
        <div className='flex flex-col gap-4'>
          {groups.map((group) => (
            <ReadinessApplicationCard key={group.applicationDocumentId} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
