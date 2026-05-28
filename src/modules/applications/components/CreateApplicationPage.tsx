'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { useCreateApplication } from '@/modules/applications/queries/use-create-application.mutation';
import { useSubmitApplication } from '@/modules/applications/queries/use-submit-application.mutation';
import { usePresetSchool } from '@/modules/applications/queries/use-preset-school.query';
import { CreateApplicationForm } from '@/modules/applications/components/CreateApplicationForm';
import type { CreateApplicationFormValues } from '@/modules/applications/schemas/create-application.schema';

export function CreateApplicationPage() {
  const t = useTranslations('Applications');
  const router = useRouter();
  const searchParams = useSearchParams();
  const schoolParam = searchParams.get('school') ?? undefined;
  const slugParam = searchParams.get('slug') ?? undefined;

  const { data: studentsData, isLoading: isLoadingStudents } = useStudents({ pageSize: 100, status: 'active' });
  const { data: presetSchool, isLoading: isLoadingPresetSchool } = usePresetSchool(schoolParam, slugParam);

  const createApplication = useCreateApplication();
  const submitApplication = useSubmitApplication();

  const isSubmitting = createApplication.isPending || submitApplication.isPending;
  const students = studentsData?.data ?? [];
  const isWaitingForPreset = Boolean(schoolParam || slugParam) && isLoadingPresetSchool;

  async function handleSubmit(values: CreateApplicationFormValues) {
    try {
      const created = await createApplication.mutateAsync(values);
      try {
        await submitApplication.mutateAsync(created.documentId);
        toast.success(t('createSubmitSuccess'));
      } catch {
        toast.warning(t('createDraftSavedSubmitFailed'));
      }
      router.push(`/dashboard/applications/${created.documentId}`);
    } catch {
      toast.error(t('createError'));
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <Link href='/dashboard/applications'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='mr-1 h-4 w-4' />
            {t('backToApplications')}
          </Button>
        </Link>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('createTitle')}</h1>
      </div>

      <div className='max-w-2xl rounded-lg border border-border bg-card p-6'>
        <p className='mb-6 text-sm text-foggy'>{t('createSubtitle')}</p>
        {isWaitingForPreset ? (
          <p className='text-sm text-foggy'>{t('createLoading')}</p>
        ) : (
          <CreateApplicationForm
            students={students}
            isLoadingStudents={isLoadingStudents}
            presetSchool={presetSchool ?? null}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
