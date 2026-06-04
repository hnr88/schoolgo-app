'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  PARENT_TARGET_TERM_OPTIONS,
  PARENT_TARGET_YEAR_OPTIONS,
} from '@/modules/students/constants/parent-wizard.constants';
import { YEAR_LEVEL_OPTIONS } from '@/modules/students/constants/student.constants';
import type { ParentStepProps } from '@/modules/students/types/parent-wizard.types';
import { StepCard } from '@/modules/students/components/parent-wizard/StepCard';
import { SegmentedRadioGroup } from '@/modules/students/components/parent-wizard/fields/SegmentedRadioGroup';

const LABEL = 'text-sm font-medium text-ink-900';

export function StepEducation({ control }: ParentStepProps) {
  const t = useTranslations('StudentWizard');

  return (
    <StepCard title={t('stepEducation')} description={t('descEducation')}>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
        <FormField
          control={control}
          name='currentSchool'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldCurrentSchool')}</FormLabel>
              <FormControl><Input className='h-12' placeholder={t('placeholderSchool')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='currentYearLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldCurrentYear')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='h-12 w-full'><SelectValue placeholder={t('selectYear')} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEAR_LEVEL_OPTIONS.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='targetEntryYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>{t('fieldTargetYear')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='h-12 w-full'><SelectValue placeholder={t('selectTargetYear')} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PARENT_TARGET_YEAR_OPTIONS.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='targetEntryTerm'
          render={({ field }) => (
            <FormItem className='md:col-span-2'>
              <FormLabel className={LABEL}>{t('fieldTargetTerm')}</FormLabel>
              <FormControl>
                <SegmentedRadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  ariaLabel={t('fieldTargetTerm')}
                  className='grid-cols-2 sm:grid-cols-4'
                  options={PARENT_TARGET_TERM_OPTIONS.map((term) => ({ value: term, label: term }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StepCard>
  );
}
