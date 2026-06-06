'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useParentStudents } from '@/modules/students/queries/use-parent-students.query';
import { usePresetSchool } from '@/modules/applications/queries/use-preset-school.query';
import { useParentCreateApplication } from '@/modules/applications/queries/use-parent-create-application.mutation';
import { ParentCreateApplicationForm } from '@/modules/applications/components/ParentCreateApplicationForm';
import type { ParentCreateApplicationFormValues } from '@/modules/applications/schemas/parent-create-application.schema';
import type { ParentCreateApplicationError } from '@/modules/applications/types/parent-create-application.types';

export function ParentCreateApplicationPage() {
  const t = useTranslations('ParentApplications');
  const router = useRouter();
  const searchParams = useSearchParams();
  const schoolParam = searchParams.get('school') ?? undefined;

  const { data: studentsData, isLoading: isLoadingStudents } = useParentStudents({ pageSize: 100 });
  const { data: presetSchool, isLoading: isLoadingPresetSchool } = usePresetSchool(schoolParam);
  const createApplication = useParentCreateApplication();

  const students = studentsData?.data ?? [];
  const isWaitingForPreset = Boolean(schoolParam) && isLoadingPresetSchool;
  const hasNoStudents = !isLoadingStudents && students.length === 0;

  async function handleSubmit(values: ParentCreateApplicationFormValues) {
    try {
      const created = await createApplication.mutateAsync({
        student: values.student,
        school: values.school,
        targetYearLevel: values.targetYearLevel,
        targetIntake: values.targetIntake,
        boardingRequired: values.boardingRequired,
      });
      toast.success(t('newCreateSuccess'));
      router.push(`/parent/applications/${created.documentId}`);
    } catch (error) {
      const kind = (error as ParentCreateApplicationError | undefined)?.kind;
      if (kind === 'ageBlock') {
        toast.error(t('newCreateAgeBlockError'));
      } else if (kind === 'cricos') {
        toast.error(t('newCreateCricosError'));
      } else {
        toast.error(t('newCreateError'));
      }
    }
  }

  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col gap-6'>
      <Link
        href='/parent/applications'
        className='inline-flex items-center gap-1 text-sm font-medium text-primary-strong hover:underline'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('backToList')}
      </Link>

      <SurfaceCard padding='lg'>
        <SectionHeading title={t('newTitle')} level={1} className='mb-1' />
        <p className='mb-6 text-sm text-foggy'>{t('newSubtitle')}</p>

        {hasNoStudents ? (
          <EmptyState
            icon={UserPlus}
            title={t('newNoStudentsTitle')}
            description={t('newNoStudentsSubtitle')}
            action={
              <Link href='/parent/students/new' className={cn(buttonVariants({ size: 'sm' }))}>
                {t('newAddStudent')}
              </Link>
            }
            framed
          />
        ) : isWaitingForPreset ? (
          <div className='flex flex-col gap-4'>
            <Skeleton className='h-10 w-full rounded-md' />
            <Skeleton className='h-10 w-full rounded-md' />
          </div>
        ) : (
          <ParentCreateApplicationForm
            students={students}
            isLoadingStudents={isLoadingStudents}
            presetSchool={presetSchool ?? null}
            isSubmitting={createApplication.isPending}
            onSubmit={handleSubmit}
          />
        )}
      </SurfaceCard>
    </div>
  );
}
