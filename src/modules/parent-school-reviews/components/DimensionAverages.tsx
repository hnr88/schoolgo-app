import { useTranslations } from 'next-intl';
import { REVIEW_DIMENSIONS } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import type { ReviewAggregate } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

interface DimensionAveragesProps {
  aggregate: ReviewAggregate;
}

export function DimensionAverages({ aggregate }: DimensionAveragesProps) {
  const t = useTranslations('ParentReviews');

  return (
    <dl className='grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3'>
      {REVIEW_DIMENSIONS.map((dimension) => {
        const score = aggregate.dimensionAverages[dimension];
        return (
          <div key={dimension} className='flex items-center justify-between gap-2 text-xs'>
            <dt className='text-foggy'>{t(`dimension_${dimension}`)}</dt>
            <dd className='font-semibold text-ink-900'>
              {typeof score === 'number' ? score.toFixed(1) : t('noScore')}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
