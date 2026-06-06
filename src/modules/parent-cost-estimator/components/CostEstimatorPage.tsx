'use client';

import { useTranslations } from 'next-intl';
import { Calculator } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useCostEstimator } from '@/modules/parent-cost-estimator/hooks/useCostEstimator';
import { CostEstimatorControls } from '@/modules/parent-cost-estimator/components/CostEstimatorControls';
import { CostEstimatorSkeleton } from '@/modules/parent-cost-estimator/components/CostEstimatorSkeleton';
import { CostEstimatorSummary } from '@/modules/parent-cost-estimator/components/CostEstimatorSummary';
import { CostEstimatorTable } from '@/modules/parent-cost-estimator/components/CostEstimatorTable';

export function CostEstimatorPage() {
  const t = useTranslations('ParentCostEstimator');
  const est = useCostEstimator();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Calculator} title={t('title')} description={t('subtitle')} />

      {est.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => est.refetch()}
          retryLabel={t('retry')}
        />
      ) : est.isLoading ? (
        <CostEstimatorSkeleton />
      ) : est.isEmpty ? (
        <EmptyState
          framed
          icon={Calculator}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <Link href='/parent/search' className={buttonVariants()}>
              {t('emptyCta')}
            </Link>
          }
        />
      ) : (
        <>
          <SurfaceCard className='flex flex-col gap-4'>
            <CostEstimatorControls
              years={est.years}
              ratePct={est.ratePct}
              basis={est.basis}
              onYearsChange={est.setYears}
              onRateChange={est.setRatePct}
              onBasisChange={est.setBasis}
            />
            <p className='text-xs text-foggy'>{t('assumptionNote')}</p>
          </SurfaceCard>

          <CostEstimatorSummary summary={est.summary} years={est.years} />
          <CostEstimatorTable rows={est.rows} />
        </>
      )}
    </div>
  );
}
