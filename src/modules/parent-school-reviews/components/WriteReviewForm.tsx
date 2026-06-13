'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
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
import { Textarea } from '@/components/ui/textarea';
import { DimensionFields } from '@/modules/parent-school-reviews/components/DimensionFields';
import { ReviewToggleFields } from '@/modules/parent-school-reviews/components/ReviewToggleFields';
import { StarInput } from '@/modules/parent-school-reviews/components/StarInput';
import { getWriteReviewDefaults } from '@/modules/parent-school-reviews/lib/parent-school-reviews';
import { useWriteReview } from '@/modules/parent-school-reviews/queries/use-write-review.mutation';
import { writeReviewSchema } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';
import type { WriteReviewValues } from '@/modules/parent-school-reviews/schemas/parent-school-reviews.schema';
import type { ReviewableSchool } from '@/modules/parent-school-reviews/types/parent-school-reviews.types';

interface WriteReviewFormProps {
  schools: ReviewableSchool[];
  presetSchoolDocumentId: string | null;
  onDone: () => void;
}

export function WriteReviewForm({ schools, presetSchoolDocumentId, onDone }: WriteReviewFormProps) {
  const t = useTranslations('ParentReviews');
  const writeReview = useWriteReview();
  const form = useForm<WriteReviewValues>({
    resolver: zodResolver(writeReviewSchema),
    defaultValues: { ...getWriteReviewDefaults(), schoolDocumentId: presetSchoolDocumentId ?? '' },
  });

  function onSubmit(values: WriteReviewValues) {
    writeReview.mutate(values, { onSuccess: onDone });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='schoolDocumentId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('schoolLabel')}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('schoolPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.documentId} value={school.documentId}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='overallStar'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('overallStarLabel')}</FormLabel>
              <FormControl>
                <StarInput
                  value={field.value}
                  onChange={field.onChange}
                  starLabel={(star) => t('starLabel', { star })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DimensionFields control={form.control} />
        <FormField
          control={form.control}
          name='body'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('bodyLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={t('bodyPlaceholder')}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ReviewToggleFields control={form.control} />
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onDone}>
            {t('cancel')}
          </Button>
          <Button type='submit' disabled={writeReview.isPending}>
            {t('submit')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
