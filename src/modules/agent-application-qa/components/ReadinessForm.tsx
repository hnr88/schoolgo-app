'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Loader2, ScanSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { StudentPickerField } from '@/modules/agent-application-qa/components/StudentPickerField';
import { SchoolMultiPickerField } from '@/modules/agent-application-qa/components/SchoolMultiPickerField';
import { readinessFormSchema } from '@/modules/agent-application-qa/schemas/readiness.schema';
import type { useSchoolSelection } from '@/modules/agent-application-qa/hooks/useSchoolSelection';
import type {
  ReadinessFormValues,
  ReadinessStudentOption,
} from '@/modules/agent-application-qa/types/readiness.types';

interface ReadinessFormProps {
  students: ReadinessStudentOption[];
  isLoadingStudents: boolean;
  isSubmitting: boolean;
  schoolSelection: ReturnType<typeof useSchoolSelection>;
  onSubmit: (values: ReadinessFormValues) => void;
}

export function ReadinessForm({
  students,
  isLoadingStudents,
  isSubmitting,
  schoolSelection,
  onSubmit,
}: ReadinessFormProps) {
  const t = useTranslations('AgentApplicationQa');
  const form = useForm<ReadinessFormValues>({
    resolver: zodResolver(readinessFormSchema),
    defaultValues: { student: '', schools: [] },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <StudentPickerField control={form.control} students={students} isLoading={isLoadingStudents} />
        <SchoolMultiPickerField
          control={form.control}
          selected={schoolSelection.selected}
          onToggle={schoolSelection.toggle}
          onRemove={schoolSelection.remove}
        />
        <div>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
            ) : (
              <ScanSearch className='mr-2 h-4 w-4' aria-hidden='true' />
            )}
            {isSubmitting ? t('submitPending') : t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
