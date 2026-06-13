'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useApplicantFit } from '@/modules/school-applicant-fit/queries/use-applicant-fit.query';
import { useFitConfig } from '@/modules/school-applicant-fit/queries/use-fit-config.query';
import { useFitTriage } from '@/modules/school-applicant-fit/hooks/useFitTriage';
import { FitBandSummary } from '@/modules/school-applicant-fit/components/FitBandSummary';
import { FitTriageTable } from '@/modules/school-applicant-fit/components/FitTriageTable';
import { FitTriagePagination } from '@/modules/school-applicant-fit/components/FitTriagePagination';
import { FitTriageSkeleton } from '@/modules/school-applicant-fit/components/FitTriageSkeleton';
import { FitBreakdownDrawer } from '@/modules/school-applicant-fit/components/FitBreakdownDrawer';
import { FitConfigDialog } from '@/modules/school-applicant-fit/components/FitConfigDialog';

export function SchoolApplicantFitPage() {
  const t = useTranslations('SchoolApplicantFit');
  const { params, handleSort, handlePage } = useFitTriage();
  const cohort = useApplicantFit(params);
  const config = useFitConfig();

  const [breakdownId, setBreakdownId] = useState<string | null>(null);
  const [isConfigOpen, setConfigOpen] = useState(false);

  const data = cohort.data;
  const isEmpty = data !== undefined && data.data.length === 0;

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={Users}
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button
            variant='outline'
            onClick={() => setConfigOpen(true)}
            disabled={config.data === undefined}
          >
            <SlidersHorizontal className='h-4 w-4' aria-hidden='true' />
            {t('configureWeights')}
          </Button>
        }
      />

      {cohort.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => cohort.refetch()}
          retryLabel={t('retry')}
        />
      ) : cohort.isLoading || data === undefined ? (
        <FitTriageSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={Users}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <>
          <FitBandSummary rows={data.data} total={data.meta.pagination.total} />
          <div className='flex flex-col rounded-xl border border-divider bg-card shadow-1'>
            <FitTriageTable
              rows={data.data}
              params={params}
              onSort={handleSort}
              onOpenBreakdown={setBreakdownId}
            />
            <FitTriagePagination pagination={data.meta.pagination} onPageChange={handlePage} />
          </div>
        </>
      )}

      <FitBreakdownDrawer documentId={breakdownId} onClose={() => setBreakdownId(null)} />
      {config.data !== undefined ? (
        <FitConfigDialog config={config.data} open={isConfigOpen} onOpenChange={setConfigOpen} />
      ) : null}
    </div>
  );
}
