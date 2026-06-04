'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useParentCreateApplicationForm } from '@/modules/applications/hooks/useParentCreateApplicationForm';
import { ParentStudentPickerField } from '@/modules/applications/components/ParentStudentPickerField';
import { ParentSchoolPickerField } from '@/modules/applications/components/ParentSchoolPickerField';
import type { ParentCreateApplicationFormProps } from '@/modules/applications/types/parent-create-application.types';

export function ParentCreateApplicationForm({
  students,
  isLoadingStudents,
  presetSchool,
  isSubmitting,
  onSubmit,
}: ParentCreateApplicationFormProps) {
  const t = useTranslations('ParentApplications');
  const form = useParentCreateApplicationForm(presetSchool);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <ParentStudentPickerField
          control={form.control}
          students={students}
          isLoading={isLoadingStudents}
        />
        <ParentSchoolPickerField control={form.control} presetSchool={presetSchool} />
        <div className='flex justify-end'>
          <Button type='submit' size='lg' disabled={isSubmitting}>
            {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {t('newSubmitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
