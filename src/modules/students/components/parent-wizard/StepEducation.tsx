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
} from '@/modules/students/constants/parent-wizard.constants';
import { YEAR_LEVEL_OPTIONS } from '@/modules/students/constants/student.constants';
import type { ParentStepProps } from '@/modules/students/types/parent-wizard.types';

export function StepEducation({ control }: ParentStepProps) {
  const t = useTranslations('StudentWizard');

  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
      <FormField
        control={control}
        name='currentSchool'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldCurrentSchool')}</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='currentYearLevel'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldCurrentYear')}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder={t('selectYear')} /></SelectTrigger>
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
            <FormLabel>{t('fieldTargetYear')}</FormLabel>
            <FormControl><Input inputMode='numeric' {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='targetEntryTerm'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldTargetTerm')}</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder={t('selectTerm')} /></SelectTrigger>
              </FormControl>
              <SelectContent>
                {PARENT_TARGET_TERM_OPTIONS.map((term) => (
                  <SelectItem key={term} value={term}>{term}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
