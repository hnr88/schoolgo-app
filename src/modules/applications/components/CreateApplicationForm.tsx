'use client';

import { useTranslations } from 'next-intl';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCreateApplicationForm } from '@/modules/applications/hooks/use-create-application-form';
import { StudentPickerField } from '@/modules/applications/components/StudentPickerField';
import { SchoolPickerField } from '@/modules/applications/components/SchoolPickerField';
import { ApplicationTargetFields } from '@/modules/applications/components/ApplicationTargetFields';
import type { CreateApplicationFormProps } from '@/modules/applications/types/create-application.types';

export function CreateApplicationForm({
  students,
  isLoadingStudents,
  presetSchool,
  isSubmitting,
  onSubmit,
}: CreateApplicationFormProps) {
  const t = useTranslations('Applications');
  const form = useCreateApplicationForm(presetSchool);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <StudentPickerField control={form.control} students={students} isLoading={isLoadingStudents} />
        <SchoolPickerField control={form.control} presetSchool={presetSchool} />
        <Separator />
        <ApplicationTargetFields control={form.control} />
        <div className='flex justify-end'>
          <Button type='submit' size='lg' disabled={isSubmitting}>
            {isSubmitting ? t('createSubmitting') : t('createSubmitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
