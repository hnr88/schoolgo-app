'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { Flag, MessageSquareReply, ShieldCheck, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard, StatusBadge } from '@/modules/core';
import { REVIEW_STATUS_STYLES } from '@/modules/school-reputation/constants/school-reputation.constants';
import { ReviewStars } from '@/modules/school-reputation/components/ReviewStars';
import { ReviewDimensionScores } from '@/modules/school-reputation/components/ReviewDimensionScores';
import { ReviewResponseBlock } from '@/modules/school-reputation/components/ReviewResponseBlock';
import { RespondDialog } from '@/modules/school-reputation/components/RespondDialog';
import { FlagDialog } from '@/modules/school-reputation/components/FlagDialog';
import type { ReputationReview } from '@/modules/school-reputation/types/school-reputation.types';

interface ReviewCardProps {
  review: ReputationReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations('SchoolReputation');
  const format = useFormatter();
  const [respondOpen, setRespondOpen] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <ReviewStars
              value={review.overallStar ?? 0}
              label={t('starsLabel', { count: review.overallStar ?? 0 })}
            />
            <span className='text-sm font-semibold text-ink-900'>
              {review.authorName ?? t('anonymousAuthor')}
            </span>
            {review.verifiedRelationship ? (
              <span className='inline-flex items-center gap-1 text-xs text-vivid-mint'>
                <ShieldCheck className='h-3.5 w-3.5' aria-hidden='true' />
                {t('verified')}
              </span>
            ) : null}
          </div>
          <span className='text-xs text-foggy'>
            {format.dateTime(new Date(review.createdAt), { dateStyle: 'medium' })}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          {!review.hasResponse ? (
            <StatusBadge status='unanswered' label={t('unanswered')} styles={REVIEW_STATUS_STYLES} />
          ) : null}
          <StatusBadge
            status={review.status}
            label={t(`status_${review.status}`)}
            styles={REVIEW_STATUS_STYLES}
          />
        </div>
      </div>

      {review.body ? (
        <p className='whitespace-pre-line text-sm text-foreground'>{review.body}</p>
      ) : null}

      <ReviewDimensionScores scores={review.dimensionScores} />

      <div className='flex items-center gap-4 text-xs text-foggy'>
        <span className='inline-flex items-center gap-1'>
          <ThumbsUp className='h-3.5 w-3.5' aria-hidden='true' />
          {t('helpfulCount', { count: review.helpfulCount })}
        </span>
        {review.wouldRecommend ? <span>{t('wouldRecommend')}</span> : null}
      </div>

      {review.response ? <ReviewResponseBlock response={review.response} /> : null}

      <div className='flex flex-wrap items-center gap-2'>
        <Button type='button' size='sm' className='gap-1.5' onClick={() => setRespondOpen(true)}>
          <MessageSquareReply className='h-4 w-4' aria-hidden='true' />
          {review.hasResponse ? t('editResponse') : t('respond')}
        </Button>
        <Button
          type='button'
          size='sm'
          variant='outline'
          className='gap-1.5'
          onClick={() => setFlagOpen(true)}
        >
          <Flag className='h-4 w-4' aria-hidden='true' />
          {t('flag')}
        </Button>
      </div>

      <RespondDialog
        documentId={review.documentId}
        existingBody={review.response?.body ?? null}
        open={respondOpen}
        onOpenChange={setRespondOpen}
      />
      <FlagDialog documentId={review.documentId} open={flagOpen} onOpenChange={setFlagOpen} />
    </SurfaceCard>
  );
}
