'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ClipboardCheck, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { PageHeader } from '@/modules/dashboard';
import { ReadinessForm } from '@/modules/agent-application-qa/components/ReadinessForm';
import { ReadinessResults } from '@/modules/agent-application-qa/components/ReadinessResults';
import { useReadinessStudents } from '@/modules/agent-application-qa/hooks/useReadinessStudents';
import { useSchoolSelection } from '@/modules/agent-application-qa/hooks/useSchoolSelection';
import { useReadinessCheck } from '@/modules/agent-application-qa/queries/use-readiness-check.mutation';
import type { ReadinessFormValues } from '@/modules/agent-application-qa/types/readiness.types';

export function ApplicationQaPage() {
  const t = useTranslations('AgentApplicationQa');
  const { options, isLoading, isError } = useReadinessStudents();
  const schoolSelection = useSchoolSelection();
  const check = useReadinessCheck();

  function handleSubmit(values: ReadinessFormValues) {
    check.mutate(
      { studentDocumentId: values.student, schoolIds: values.schools },
      {
        onSuccess: (data) => toast.success(t('checkSuccess', { count: data.results.length })),
        onError: () => toast.error(t('checkError')),
      },
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader title={t('title')} description={t('subtitle')} eyebrow={t('eyebrow')} />

      <SurfaceCard className='flex max-w-2xl flex-col gap-6'>
        <p className='flex items-start gap-2 text-sm text-foggy'>
          <Info className='mt-0.5 h-4 w-4 shrink-0' aria-hidden='true' />
          {t('intro')}
        </p>
        {isLoading ? (
          <div className='flex flex-col gap-4'>
            <Skeleton className='h-10 w-full rounded-md' />
            <Skeleton className='h-10 w-full rounded-md' />
            <Skeleton className='h-10 w-32 rounded-md' />
          </div>
        ) : isError ? (
          <ErrorState message={t('studentsError')} />
        ) : options.length === 0 ? (
          <EmptyState
            icon={ClipboardCheck}
            title={t('studentsEmptyTitle')}
            description={t('studentsEmptyDescription')}
          />
        ) : (
          <ReadinessForm
            students={options}
            isLoadingStudents={isLoading}
            isSubmitting={check.isPending}
            schoolSelection={schoolSelection}
            onSubmit={handleSubmit}
          />
        )}
      </SurfaceCard>

      {check.isError && !check.isPending ? (
        <ErrorState
          framed
          message={t('checkError')}
          onRetry={() => check.reset()}
          retryLabel={t('retry')}
        />
      ) : check.data ? (
        <ReadinessResults results={check.data.results} labelFor={schoolSelection.labelFor} />
      ) : null}
    </div>
  );
}
