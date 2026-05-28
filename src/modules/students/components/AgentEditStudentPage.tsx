'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { StudentForm } from '@/modules/students/components/StudentForm';
import { useStudent } from '@/modules/students/queries/use-student.query';
import { useUpdateStudent } from '@/modules/students/queries/use-update-student.mutation';
import { studentToFormValues } from '@/modules/students/lib/student-to-form-values';
import type { StudentFormValues } from '@/modules/students/schemas/student.schema';
import type { StudentProfileProps } from '@/modules/students/types/component.types';

export function AgentEditStudentPage({ documentId }: StudentProfileProps) {
  const t = useTranslations('Students');
  const router = useRouter();
  const { data: student, isLoading } = useStudent(documentId);
  const updateStudent = useUpdateStudent(documentId);

  async function handleSubmit(values: StudentFormValues) {
    try {
      await updateStudent.mutateAsync(values);
      toast.success(t('updateSuccess'));
      router.push(`/dashboard/students/${documentId}`);
    } catch {
      toast.error(t('updateError'));
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <Link href={`/dashboard/students/${documentId}`}>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='mr-1 h-4 w-4' />
            {t('backToList')}
          </Button>
        </Link>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('editTitle')}</h1>
      </div>

      <div className='rounded-lg border border-border bg-card p-6'>
        {isLoading ? (
          <div className='flex flex-col gap-4'>
            <Skeleton className='h-10 w-full rounded-md' />
            <Skeleton className='h-10 w-full rounded-md' />
            <Skeleton className='h-32 w-full rounded-md' />
          </div>
        ) : student ? (
          <StudentForm
            defaultValues={studentToFormValues(student)}
            onSubmit={handleSubmit}
            isLoading={updateStudent.isPending}
            submitLabel={t('editButton')}
          />
        ) : (
          <p className='text-sm text-foggy'>{t('notFound')}</p>
        )}
      </div>
    </div>
  );
}
