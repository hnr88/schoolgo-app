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
    <div className='flex flex-col gap-8'>
      <header className='flex flex-col gap-3'>
        <Link href='/dashboard/students'>
          <Button variant='ghost' size='sm' className='-ml-2 w-fit text-foggy'>
            <ArrowLeft className='mr-1 h-4 w-4' />
            {t('backToList')}
          </Button>
        </Link>
        <div className='flex flex-col gap-1'>
          <h1 className='font-display text-3xl font-bold text-ink-900'>{t('createTitle')}</h1>
          <p className='text-base text-foggy'>{t('createSubtitle')}</p>
        </div>
      </header>

      <StudentForm
        onSubmit={handleSubmit}
        isLoading={createStudent.isPending}
        submitLabel={t('createButton')}
        cancelHref='/dashboard/students'
      />
    </div>
  );
}
