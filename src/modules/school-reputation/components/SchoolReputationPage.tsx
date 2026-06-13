'use client';

import { useTranslations } from 'next-intl';
import { ErrorState } from '@/modules/core';
import { ReputationSkeleton } from '@/modules/school-reputation/components/ReputationSkeleton';
import { ReputationStats } from '@/modules/school-reputation/components/ReputationStats';
import { BenchmarkPanel } from '@/modules/school-reputation/components/BenchmarkPanel';
import { ReviewsInbox } from '@/modules/school-reputation/components/ReviewsInbox';
import { useReputationReviews } from '@/modules/school-reputation/queries/use-reputation-reviews.query';
import { useReputationBenchmark } from '@/modules/school-reputation/queries/use-reputation-benchmark.query';
import { countUnanswered } from '@/modules/school-reputation/lib/school-reputation';

export function SchoolReputationPage() {
  const t = useTranslations('SchoolReputation');
  const reviewsQuery = useReputationReviews();
  const benchmarkQuery = useReputationBenchmark();

  if (reviewsQuery.isLoading) {
    return <ReputationSkeleton />;
  }

  if (reviewsQuery.isError || !reviewsQuery.data) {
    return (
      <ErrorState
        framed
        message={t('loadError')}
        onRetry={() => reviewsQuery.refetch()}
        retryLabel={t('retry')}
      />
    );
  }

  const reviews = reviewsQuery.data.data;
  const { aggregate } = reviewsQuery.data.meta;
  const benchmark = benchmarkQuery.data?.data ?? null;

  return (
    <div className='flex flex-col gap-6'>
      <ReputationStats
        aggregate={aggregate}
        unansweredCount={countUnanswered(reviews)}
        benchmark={benchmark}
      />

      {benchmarkQuery.isError ? (
        <ErrorState
          framed
          message={t('benchmarkError')}
          onRetry={() => benchmarkQuery.refetch()}
          retryLabel={t('retry')}
        />
      ) : benchmark ? (
        <BenchmarkPanel benchmark={benchmark} />
      ) : null}

      <ReviewsInbox reviews={reviews} />
    </div>
  );
}
