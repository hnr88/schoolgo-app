'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock, FilePen, Hourglass, ListChecks } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useAgentFollowUps } from '@/modules/agent-follow-ups/queries/use-agent-follow-ups.query';
import { FollowUpsBucketColumn } from '@/modules/agent-follow-ups/components/FollowUpsBucketColumn';

function BoardSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, index) => (
        <SurfaceCard key={index} padding='sm' className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-32 rounded-md' />
          <Skeleton className='h-20 w-full rounded-md' />
          <Skeleton className='h-20 w-full rounded-md' />
        </SurfaceCard>
      ))}
    </div>
  );
}

export function AgentFollowUpsPage() {
  const t = useTranslations('AgentFollowUps');
  const query = useAgentFollowUps();

  const buckets = query.data?.data;
  const counts = query.data?.meta.counts;
  const isEmpty =
    !!counts &&
    counts.staleInReview === 0 &&
    counts.agingDrafts === 0 &&
    counts.expiringOffers === 0;

  return (
    <div className='flex flex-col gap-4'>
      <SectionHeading title={t('title')} description={t('subtitle')} />
      {query.isLoading ? (
        <BoardSkeleton />
      ) : query.isError || !buckets || !counts ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => query.refetch()}
          retryLabel={t('retry')}
        />
      ) : isEmpty ? (
        <EmptyState framed icon={ListChecks} title={t('emptyTitle')} description={t('emptyDescription')} />
      ) : (
        <div className='grid items-start gap-4 md:grid-cols-3'>
          <FollowUpsBucketColumn
            icon={Hourglass}
            titleKey='staleTitle'
            emptyKey='staleEmpty'
            count={counts.staleInReview}
            items={buckets.staleInReview}
            variant='stale'
          />
          <FollowUpsBucketColumn
            icon={FilePen}
            titleKey='draftsTitle'
            emptyKey='draftsEmpty'
            count={counts.agingDrafts}
            items={buckets.agingDrafts}
            variant='draft'
          />
          <FollowUpsBucketColumn
            icon={CalendarClock}
            titleKey='offersTitle'
            emptyKey='offersEmpty'
            count={counts.expiringOffers}
            items={buckets.expiringOffers}
            variant='offer'
          />
        </div>
      )}
    </div>
  );
}
