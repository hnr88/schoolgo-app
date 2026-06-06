'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { useBulkCreateApplications } from '@/modules/applications/queries/use-bulk-create-applications.mutation';
import { usePresetSchool } from '@/modules/applications/queries/use-preset-school.query';
import { CreateApplicationForm } from '@/modules/applications/components/CreateApplicationForm';
import { BulkCreateResultSummary } from '@/modules/applications/components/BulkCreateResultSummary';
import type { BulkCreateApplicationFormValues } from '@/modules/applications/schemas/create-application.schema';
import type { BulkCreateResult } from '@/modules/applications/types/create-application.types';

export function CreateApplicationPage() {
  const t = useTranslations('Applications');
  const searchParams = useSearchParams();
  const schoolParam = searchParams.get('school') ?? undefined;
  const slugParam = searchParams.get('slug') ?? undefined;

  const { data: studentsData, isLoading: isLoadingStudents } = useStudents({ pageSize: 100, status: 'active' });
  const { data: presetSchool, isLoading: isLoadingPresetSchool } = usePresetSchool(schoolParam, slugParam);

  const bulkCreate = useBulkCreateApplications();
  const [result, setResult] = useState<BulkCreateResult | null>(null);
  const [resultLabels, setResultLabels] = useState<Record<string, string>>({});

  const students = studentsData?.data ?? [];
  const isWaitingForPreset = Boolean(schoolParam || slugParam) && isLoadingPresetSchool;

  async function handleSubmit(
    values: BulkCreateApplicationFormValues,
    schoolLabels: Record<string, string>,
  ) {
    try {
      const summary = await bulkCreate.mutateAsync(values);
      setResult(summary);
      setResultLabels(schoolLabels);
      if (summary.created.length > 0) {
        toast.success(t('fanoutCreatedToast', { count: summary.created.length }));
      }
      if (summary.errors.length > 0) {
        toast.warning(t('fanoutErrorsToast', { count: summary.errors.length }));
      }
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
            isSubmitting={bulkCreate.isPending}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {result && (
        <div className='max-w-2xl rounded-lg border border-border bg-card p-6'>
          <BulkCreateResultSummary result={result} schoolLabels={resultLabels} />
        </div>
      )}
    </div>
  );
}
