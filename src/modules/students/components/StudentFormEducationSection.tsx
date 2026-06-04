'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StudentFormSectionCard } from '@/modules/students/components/StudentFormSectionCard';
import { YEAR_LEVEL_OPTIONS } from '@/modules/students/constants/student.constants';
import type { StudentFormEducationSectionProps } from '@/modules/students/types/component.types';

export function StudentFormEducationSection({ control }: StudentFormEducationSectionProps) {
  const t = useTranslations('Students');

  return (
    <StudentFormSectionCard
      icon={GraduationCap}
      title={t('sectionEducation')}
      description={t('sectionEducationDesc')}
    >
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <FormField
          control={control}
          name='currentSchool'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldCurrentSchool')}</FormLabel>
              <FormControl><Input placeholder={t('fieldCurrentSchoolPlaceholder')} {...field} /></FormControl>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name='targetEntryTerm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fieldTargetTerm')}</FormLabel>
              <FormControl><Input placeholder={t('fieldTargetTermPlaceholder')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StudentFormSectionCard>
  );
}
