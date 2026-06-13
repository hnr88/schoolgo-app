'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REVIEW_STAR_VALUES } from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';

interface StarInputProps {
  value: number;
  onChange: (value: number) => void;
  starLabel: (star: number) => string;
}

export function StarInput({ value, onChange, starLabel }: StarInputProps) {
  return (
    <div className='flex items-center gap-1' role='radiogroup'>
      {REVIEW_STAR_VALUES.map((star) => (
        <button
          key={star}
          type='button'
          role='radio'
          aria-checked={value === star}
          aria-label={starLabel(star)}
          onClick={() => onChange(star)}
          className='rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        >
          <Star
            className={cn(
              'h-7 w-7 transition-colors',
              star <= value ? 'fill-rausch-500 text-rausch-500' : 'fill-transparent text-divider',
            )}
            aria-hidden='true'
          />
        </button>
      ))}
    </div>
  );
}
