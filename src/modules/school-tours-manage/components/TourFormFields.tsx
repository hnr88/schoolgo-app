'use client';

import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { TourFormInput } from '@/modules/school-tours-manage/lib/tour-form-defaults';
import type { TourFormValues } from '@/modules/school-tours-manage/schemas/tour-form.schema';

interface TourFormFieldsProps {
  form: UseFormReturn<TourFormInput, unknown, TourFormValues>;
}

export function TourFormFields({ form }: TourFormFieldsProps) {
  const t = useTranslations('SchoolTours');

  return (
    <>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldTitleLabel')}</FormLabel>
            <FormControl>
              <Input placeholder={t('fieldTitlePlaceholder')} autoComplete='off' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='grid gap-4 sm:grid-cols-2'>
        <FormField
          control={form.control}
          name='startsAt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldStartsAtLabel')}</FormLabel>
              <FormControl>
                <Input type='datetime-local' {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='capacity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldCapacityLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='1'
                  step='1'
                  value={field.value ?? 1}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name='location'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldLocationLabel')}</FormLabel>
            <FormControl>
              <Input placeholder={t('fieldLocationPlaceholder')} autoComplete='off' {...field} value={field.value ?? ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldDescriptionLabel')}</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder={t('fieldDescriptionPlaceholder')} {...field} value={field.value ?? ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
