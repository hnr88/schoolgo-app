'use client';

import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  TARGET_INTAKE_OPTIONS,
  TARGET_YEAR_LEVEL_OPTIONS,
} from '@/modules/applications/constants/create-application.constants';
import type { ApplicationTargetFieldsProps } from '@/modules/applications/types/create-application.types';

export function ApplicationTargetFields({ control }: ApplicationTargetFieldsProps) {
  const t = useTranslations('Applications');

  return (
    <div className='flex flex-col gap-5'>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <FormField
          control={control}
          name='targetYearLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('createYearLevelLabel')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('createSelectYearLevel')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TARGET_YEAR_LEVEL_OPTIONS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='targetIntake'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('createIntakeLabel')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('createSelectIntake')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TARGET_INTAKE_OPTIONS.map((intake) => (
                    <SelectItem key={intake} value={intake}>
                      {intake}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name='boardingRequired'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center gap-3'>
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className='font-normal'>{t('createBoardingLabel')}</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
