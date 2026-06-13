'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { TrendingUp } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { usePipelineForecast } from '@/modules/agent-pipeline-forecast/queries/use-pipeline-forecast.query';
import {
  deriveSchoolOptions,
  filterAtRisk,
} from '@/modules/agent-pipeline-forecast/lib/format-forecast';
import { PipelineForecastSkeleton } from '@/modules/agent-pipeline-forecast/components/PipelineForecastSkeleton';
import { ForecastSummary } from '@/modules/agent-pipeline-forecast/components/ForecastSummary';
import { AtRiskTriage } from '@/modules/agent-pipeline-forecast/components/AtRiskTriage';
import { ForecastTable } from '@/modules/agent-pipeline-forecast/components/ForecastTable';
import { StageStatsPanel } from '@/modules/agent-pipeline-forecast/components/StageStatsPanel';

export function PipelineForecastPage() {
  const t = useTranslations('AgentForecast');
  const query = usePipelineForecast();
  const forecast = query.data;

  const items = useMemo(() => forecast?.data ?? [], [forecast]);
  const atRisk = useMemo(() => filterAtRisk(items), [items]);
  const schools = useMemo(() => deriveSchoolOptions(items), [items]);

  const isEmpty = forecast !== undefined && forecast.meta.totalActive === 0;

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={TrendingUp}
        title={t('title')}
        description={t('subtitle')}
      />

      {query.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => query.refetch()}
          retryLabel={t('retry')}
        />
      ) : query.isLoading || forecast === undefined ? (
        <PipelineForecastSkeleton />
      ) : isEmpty ? (
        <EmptyState
          framed
          icon={TrendingUp}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <>
          <ForecastSummary counts={forecast.meta.counts} totalActive={forecast.meta.totalActive} />
          <AtRiskTriage items={atRisk} />
          <ForecastTable items={items} />
          {schools.length > 0 ? <StageStatsPanel schools={schools} /> : null}
        </>
      )}
    </div>
  );
}
