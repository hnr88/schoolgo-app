'use client';

import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { studentName } from '@/modules/agent-application-qa/lib/student-name';
import type {
  ReadinessFormValues,
  ReadinessStudentOption,
} from '@/modules/agent-application-qa/types/readiness.types';

export function StudentPickerField({
  control,
  students,
  isLoading,
}: {
  control: Control<ReadinessFormValues>;
  students: ReadinessStudentOption[];
  isLoading: boolean;
}) {
  const t = useTranslations('AgentApplicationQa');
  const placeholder = isLoading ? t('studentsLoading') : t('studentSelect');

  return (
    <FormField
      control={control}
      name='student'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('studentLabel')}</FormLabel>
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
                  {studentName(student, t('studentUnnamed'))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!isLoading && students.length === 0 && (
            <p className='text-sm text-foggy'>{t('studentsEmpty')}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
