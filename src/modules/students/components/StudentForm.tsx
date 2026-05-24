'use client';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useStudentForm } from '@/modules/students/hooks/use-student-form';
import { StudentFormPersonalSection } from '@/modules/students/components/StudentFormPersonalSection';
import { StudentFormEducationSection } from '@/modules/students/components/StudentFormEducationSection';
import { StudentFormParentSection } from '@/modules/students/components/StudentFormParentSection';
import { StudentFormNotesField } from '@/modules/students/components/StudentFormNotesField';
import { StudentFormSubmitButton } from '@/modules/students/components/StudentFormSubmitButton';
import type { StudentFormProps } from '@/modules/students/types/component.types';

export function StudentForm({ defaultValues, onSubmit, isLoading, submitLabel }: StudentFormProps) {
  const form = useStudentForm({ defaultValues });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <StudentFormPersonalSection control={form.control} />
        <Separator />
        <StudentFormEducationSection control={form.control} />
        <Separator />
        <StudentFormParentSection control={form.control} />
        <Separator />
        <StudentFormNotesField control={form.control} />
        <StudentFormSubmitButton isLoading={isLoading} submitLabel={submitLabel} />
      </form>
    </Form>
  );
}
