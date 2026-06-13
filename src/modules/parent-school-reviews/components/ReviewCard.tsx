'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { BadgeCheck, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import { StarRating } from '@/modules/parent-school-reviews/components/StarRating';
import { useMarkHelpful } from '@/modules/parent-school-reviews/queries/use-mark-helpful.mutation';
import type { ReviewListItem } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

interface ReviewCardProps {
  review: ReviewListItem;
  schoolDocumentId: string;
}

export function ReviewCard({ review, schoolDocumentId }: ReviewCardProps) {
  const t = useTranslations('ParentReviews');
  const format = useFormatter();
  const markHelpful = useMarkHelpful();

  return (
    <SurfaceCard padding='md' className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <StarRating
            value={review.overallStar ?? 0}
            label={t('starsAria', { stars: review.overallStar ?? 0 })}
          />
          <span className='text-sm font-medium text-ink-900'>
            {review.authorName ?? t('anonymousAuthor')}
          </span>
          {review.verifiedRelationship && (
            <span className='inline-flex items-center gap-1 text-xs font-medium text-primary'>
              <BadgeCheck className='h-4 w-4' aria-hidden='true' />
              {t('verifiedBadge')}
            </span>
          )}
        </div>
        <span className='text-xs text-foggy'>
          {format.dateTime(new Date(review.createdAt), { dateStyle: 'medium' })}
        </span>
      </div>

      {review.body && <p className='text-sm text-hof'>{review.body}</p>}

      <div className='flex flex-wrap items-center gap-2 text-xs text-foggy'>
        {review.wouldRecommend && <span>{t('recommendsTag')}</span>}
        {review.consideredSwitching && <span>{t('switchingTag')}</span>}
      </div>

      <div className='flex items-center justify-end'>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='gap-1.5'
          disabled={markHelpful.isPending}
          onClick={() =>
            markHelpful.mutate({ reviewDocumentId: review.documentId, schoolDocumentId })
          }
        >
          <ThumbsUp className='h-4 w-4' aria-hidden='true' />
          {t('helpfulCount', { count: review.helpfulCount })}
        </Button>
      </div>
    </SurfaceCard>
  );
}
