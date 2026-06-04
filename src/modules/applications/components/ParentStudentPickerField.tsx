'use client';

import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ParentStudentPickerFieldProps } from '@/modules/applications/types/parent-create-application.types';

export function ParentStudentPickerField({
  control,
  students,
  isLoading,
}: ParentStudentPickerFieldProps) {
  const t = useTranslations('ParentApplications');

  return (
    <FormField
      control={control}
      name='student'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{t('newStudentLabel')}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder={isLoading ? t('newLoadingStudents') : t('newSelectStudent')}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.documentId} value={student.documentId}>
                  {student.firstName} {student.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
