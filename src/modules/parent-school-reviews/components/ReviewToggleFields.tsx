'use client';

import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import type { WriteReviewValues } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';

interface ReviewToggleFieldsProps {
  control: Control<WriteReviewValues>;
}

const TOGGLES = [
  { name: 'wouldRecommend', label: 'wouldRecommendLabel' },
  { name: 'consideredSwitching', label: 'consideredSwitchingLabel' },
] as const;

export function ReviewToggleFields({ control }: ReviewToggleFieldsProps) {
  const t = useTranslations('ParentReviews');

  return (
    <div className='flex flex-col gap-3'>
      {TOGGLES.map(({ name, label }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className='flex items-center justify-between gap-4 rounded-lg border border-divider px-3 py-2'>
              <FormLabel className='font-normal'>{t(label)}</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
