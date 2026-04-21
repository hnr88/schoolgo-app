'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { StudentForm } from '@/modules/students/components/StudentForm';
import { useCreateStudent } from '@/modules/students/queries/use-create-student.mutation';
import type { StudentFormValues } from '@/modules/students/schemas/student.schema';

export function CreateStudentPage() {
  const t = useTranslations('Students');
  const router = useRouter();
  const createStudent = useCreateStudent();

  async function handleSubmit(values: StudentFormValues) {
    try {
      const student = await createStudent.mutateAsync(values);
      toast.success(t('createSuccess'));
      router.push(`/dashboard/students/${student.documentId}`);
    } catch {
      toast.error(t('createError'));
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <Link href='/dashboard/students'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='mr-1 h-4 w-4' />
            {t('backToList')}
          </Button>
        </Link>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('createTitle')}</h1>
      </div>

      <div className='rounded-lg border border-border bg-card p-6'>
        <StudentForm
          onSubmit={handleSubmit}
          isLoading={createStudent.isPending}
          submitLabel={t('createButton')}
        />
      </div>
    </div>
  );
}
