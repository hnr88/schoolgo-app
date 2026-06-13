'use client';

import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  REVIEW_DIMENSIONS,
  REVIEW_STAR_VALUES,
} from '@/modules/parent-school-reviews/constants/parent-school-reviews.constants';
import type { WriteReviewValues } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';

interface DimensionFieldsProps {
  control: Control<WriteReviewValues>;
}

export function DimensionFields({ control }: DimensionFieldsProps) {
  const t = useTranslations('ParentReviews');

  return (
    <div className='grid gap-3 sm:grid-cols-2'>
      {REVIEW_DIMENSIONS.map((dimension) => (
        <FormField
          key={dimension}
          control={control}
          name={dimension}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t(`dimension_${dimension}`)}</FormLabel>
              <Select
                value={String(field.value)}
                onValueChange={(next) => field.onChange(Number(next))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {REVIEW_STAR_VALUES.map((star) => (
                    <SelectItem key={star} value={String(star)}>
                      {t('scoreOption', { score: star })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
