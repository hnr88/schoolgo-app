'use client';

import { useTranslations } from 'next-intl';
import { MessageSquarePlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { DimensionAverages } from '@/modules/parent-school-reviews/components/DimensionAverages';
import { ReviewCard } from '@/modules/parent-school-reviews/components/ReviewCard';
import { StarRating } from '@/modules/parent-school-reviews/components/StarRating';
import { useSchoolReviews } from '@/modules/parent-school-reviews/queries/use-school-reviews.query';

interface SchoolReviewsPublicProps {
  schoolDocumentId: string;
}

export function SchoolReviewsPublic({ schoolDocumentId }: SchoolReviewsPublicProps) {
  const t = useTranslations('ParentReviews');
  const { data, isLoading, isError, refetch } = useSchoolReviews(schoolDocumentId);
  const aggregate = data?.meta.aggregate;
  const hasReviews = (aggregate?.count ?? 0) > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasReviews && aggregate ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-display-h1 font-bold tabular-nums text-ink-900">
            {(aggregate.avgRating ?? 0).toFixed(1)}
          </span>
          <StarRating
            value={aggregate.avgRating ?? 0}
            label={t('starsAria', { stars: aggregate.avgRating ?? 0 })}
          />
          <span className="text-body-sm text-foggy">
            {t('reviewSummary', {
              rating: (aggregate.avgRating ?? 0).toFixed(1),
              count: aggregate.count,
            })}
          </span>
        </div>
      ) : (
        !isLoading && !isError && <p className="text-body-sm text-foggy">{t('noReviewsYet')}</p>
      )}

      {isLoading && <Skeleton className="h-24 w-full rounded-lg" />}

      {isError && (
        <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      )}

      {hasReviews && aggregate && (
        <div className="rounded-lg bg-gray-50 p-4">
          <DimensionAverages aggregate={aggregate} />
        </div>
      )}

      {data && data.data.length === 0 && !isLoading && (
        <EmptyState
          icon={MessageSquarePlus}
          title={t('beFirstTitle')}
          description={t('beFirstDescription')}
        />
      )}

      {data && data.data.length > 0 && (
        <div className="flex flex-col gap-3">
          {data.data.map((review) => (
            <ReviewCard key={review.documentId} review={review} schoolDocumentId={schoolDocumentId} />
          ))}
        </div>
      )}
    </div>
  );
}
