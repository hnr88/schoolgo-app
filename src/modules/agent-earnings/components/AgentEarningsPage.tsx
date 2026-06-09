'use client';

import { useTranslations } from 'next-intl';
import { TrendingUp } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useEarningsDashboard } from '@/modules/agent-earnings/hooks/useEarningsDashboard';
import { AgentEarningsSkeleton } from '@/modules/agent-earnings/components/AgentEarningsSkeleton';
import { EarningsTotals } from '@/modules/agent-earnings/components/EarningsTotals';
import { EarningsMonthlyChart } from '@/modules/agent-earnings/components/EarningsMonthlyChart';
import { EarningsMethodTable } from '@/modules/agent-earnings/components/EarningsMethodTable';

export function AgentEarningsPage() {
  const t = useTranslations('AgentEarnings');
  const dashboard = useEarningsDashboard();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={TrendingUp} title={t('title')} description={t('subtitle')} />

      {dashboard.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => dashboard.refetch()}
          retryLabel={t('retry')}
        />
      ) : dashboard.isLoading ? (
        <AgentEarningsSkeleton />
      ) : dashboard.isEmpty ? (
        <EmptyState
          framed
          icon={TrendingUp}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <>
          <EarningsTotals totals={dashboard.aggregation.totals} />
          <EarningsMonthlyChart byMonth={dashboard.aggregation.byMonth} />
          <EarningsMethodTable byMethod={dashboard.aggregation.byMethod} />
        </>
      )}
    </div>
  );
}
