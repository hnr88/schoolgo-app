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
import type { StudentPickerFieldProps } from '@/modules/applications/types/create-application.types';

export function StudentPickerField({ control, students, isLoading }: StudentPickerFieldProps) {
  const t = useTranslations('Applications');
  const placeholder = isLoading ? t('createLoadingStudents') : t('createSelectStudent');

  return (
    <FormField
      control={control}
      name='student'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('createStudentLabel')}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isLoading || students.length === 0}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
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
          {!isLoading && students.length === 0 && (
            <p className='text-sm text-foggy'>{t('createNoStudents')}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
