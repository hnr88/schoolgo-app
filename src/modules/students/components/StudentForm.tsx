'use client';

import { Form } from '@/components/ui/form';
import { useStudentForm } from '@/modules/students/hooks/use-student-form';
import { StudentFormPersonalSection } from '@/modules/students/components/StudentFormPersonalSection';
import { StudentFormEducationSection } from '@/modules/students/components/StudentFormEducationSection';
import { StudentFormParentSection } from '@/modules/students/components/StudentFormParentSection';
import { StudentFormNotesField } from '@/modules/students/components/StudentFormNotesField';
import { StudentFormSummary } from '@/modules/students/components/StudentFormSummary';
import { StudentFormActionBar } from '@/modules/students/components/StudentFormActionBar';
import type { StudentFormProps } from '@/modules/students/types/component.types';

export function StudentForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  cancelHref,
}: StudentFormProps) {
  const form = useStudentForm({ defaultValues });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-8 lg:grid-cols-3'
      >
        <div className='flex flex-col gap-8 lg:col-span-2'>
          <StudentFormPersonalSection control={form.control} />
          <StudentFormEducationSection control={form.control} />
          <StudentFormParentSection control={form.control} />
          <StudentFormNotesField control={form.control} />
          <StudentFormActionBar
            isLoading={isLoading}
            submitLabel={submitLabel}
            cancelHref={cancelHref}
          />
        </div>
        <StudentFormSummary control={form.control} />
      </form>
    </Form>
  );
}
