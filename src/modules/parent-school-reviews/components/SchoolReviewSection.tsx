'use client';

import { useTranslations } from 'next-intl';
import { MessageSquarePlus, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { DimensionAverages } from '@/modules/parent-school-reviews/components/DimensionAverages';
import { ReviewCard } from '@/modules/parent-school-reviews/components/ReviewCard';
import { StarRating } from '@/modules/parent-school-reviews/components/StarRating';
import { useSchoolReviews } from '@/modules/parent-school-reviews/queries/use-school-reviews.query';
import type { ReviewableSchool } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

interface SchoolReviewSectionProps {
  school: ReviewableSchool;
  onWriteReview: (schoolDocumentId: string) => void;
}

export function SchoolReviewSection({ school, onWriteReview }: SchoolReviewSectionProps) {
  const t = useTranslations('ParentReviews');
  const { data, isLoading, isError, refetch } = useSchoolReviews(school.documentId);

  return (
    <SurfaceCard padding='lg' className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-display text-lg font-bold text-ink-900'>{school.name}</h2>
          {data && data.meta.aggregate.count > 0 ? (
            <div className='flex items-center gap-2'>
              <StarRating
                value={data.meta.aggregate.avgRating ?? 0}
                label={t('starsAria', { stars: data.meta.aggregate.avgRating ?? 0 })}
              />
              <span className='text-sm text-foggy'>
                {t('reviewSummary', {
                  rating: (data.meta.aggregate.avgRating ?? 0).toFixed(1),
                  count: data.meta.aggregate.count,
                })}
              </span>
            </div>
          ) : (
            <p className='text-sm text-foggy'>{t('noReviewsYet')}</p>
          )}
        </div>
        <Button
          type='button'
          size='sm'
          className='gap-1.5'
          onClick={() => onWriteReview(school.documentId)}
        >
          <PenLine className='h-4 w-4' aria-hidden='true' />
          {t('writeReview')}
        </Button>
      </div>

      {isLoading && <Skeleton className='h-24 w-full rounded-xl' />}

      {isError && (
        <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />
      )}

      {data && data.meta.aggregate.count > 0 && (
        <DimensionAverages aggregate={data.meta.aggregate} />
      )}

      {data && data.data.length === 0 && !isLoading && (
        <EmptyState
          icon={MessageSquarePlus}
          title={t('beFirstTitle')}
          description={t('beFirstDescription')}
        />
      )}

      {data && data.data.length > 0 && (
        <div className='flex flex-col gap-3'>
          {data.data.map((review) => (
            <ReviewCard key={review.documentId} review={review} schoolDocumentId={school.documentId} />
          ))}
        </div>
      )}
    </SurfaceCard>
  );
}
