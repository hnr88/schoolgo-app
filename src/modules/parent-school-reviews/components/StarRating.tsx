import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REVIEW_STAR_VALUES } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';

interface StarRatingProps {
  value: number;
  label: string;
  className?: string;
}

export function StarRating({ value, label, className }: StarRatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={label}>
      {REVIEW_STAR_VALUES.map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= Math.round(value)
              ? 'fill-rausch-500 text-rausch-500'
              : 'fill-transparent text-divider',
          )}
          aria-hidden='true'
        />
      ))}
    </span>
  );
}
