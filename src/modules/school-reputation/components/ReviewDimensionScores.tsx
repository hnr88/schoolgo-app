'use client';

import { useTranslations } from 'next-intl';
import { REVIEW_DIMENSIONS } from '@/modules/school-reputation/constants/school-reputation.constants';
import type { ReputationReview } from '@/modules/school-reputation/types/school-reputation.types';

interface ReviewDimensionScoresProps {
  scores: ReputationReview['dimensionScores'];
}

export function ReviewDimensionScores({ scores }: ReviewDimensionScoresProps) {
  const t = useTranslations('SchoolReputation');

  if (!scores) return null;

  return (
    <dl className='grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3'>
      {REVIEW_DIMENSIONS.map((dimension) => {
        const score = scores[dimension];
        return (
          <div key={dimension} className='flex items-center justify-between gap-2 text-xs'>
            <dt className='text-foggy'>{t(`dimension_${dimension}`)}</dt>
            <dd className='font-semibold tabular-nums text-ink-900'>
              {typeof score === 'number' ? score.toFixed(1) : t('noScore')}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
