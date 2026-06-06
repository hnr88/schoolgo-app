'use client';

import { useTranslations } from 'next-intl';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCreateApplicationForm } from '@/modules/applications/hooks/use-create-application-form';
import { useMultiSchoolSelection } from '@/modules/applications/hooks/useMultiSchoolSelection';
import { StudentPickerField } from '@/modules/applications/components/StudentPickerField';
import { MultiSchoolPickerField } from '@/modules/applications/components/MultiSchoolPickerField';
import { ApplicationTargetFields } from '@/modules/applications/components/ApplicationTargetFields';
import type {
  BulkCreateApplicationFormValues,
  CreateApplicationFormProps,
} from '@/modules/applications/types/create-application.types';

export function CreateApplicationForm({
  students,
  isLoadingStudents,
  presetSchool,
  isSubmitting,
  onSubmit,
}: CreateApplicationFormProps) {
  const t = useTranslations('Applications');
  const form = useCreateApplicationForm(presetSchool);
  const { toggle, remove, selected, labelMap } = useMultiSchoolSelection(presetSchool);

  function handleValid(values: BulkCreateApplicationFormValues) {
    onSubmit(values, labelMap(values.schools));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValid)} className='flex flex-col gap-6'>
        <StudentPickerField control={form.control} students={students} isLoading={isLoadingStudents} />
        <MultiSchoolPickerField
          control={form.control}
          selected={selected}
          onToggle={toggle}
          onRemove={remove}
        />
        <Separator />
        <ApplicationTargetFields control={form.control} />
        <div className='flex justify-end'>
          <Button type='submit' size='lg' disabled={isSubmitting}>
            {isSubmitting ? t('createSubmitting') : t('createFanoutSubmitButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
