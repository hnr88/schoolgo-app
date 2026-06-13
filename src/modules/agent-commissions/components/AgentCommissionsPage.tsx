'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Coins } from 'lucide-react';

import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useAgentCommissions } from '@/modules/agent-commissions/queries/use-agent-commissions.query';
import { useAgentCommissionsSummary } from '@/modules/agent-commissions/queries/use-agent-commissions-summary.query';
import { AgentCommissionsSkeleton } from '@/modules/agent-commissions/components/AgentCommissionsSkeleton';
import { CommissionsSummaryTiles } from '@/modules/agent-commissions/components/CommissionsSummaryTiles';
import { CommissionsFilterBar } from '@/modules/agent-commissions/components/CommissionsFilterBar';
import { CommissionsTable } from '@/modules/agent-commissions/components/CommissionsTable';
import type { CommissionFilters } from '@/modules/agent-commissions/types/agent-commissions.types';

const DEFAULT_FILTERS: CommissionFilters = { status: 'all', milestone: 'all' };

export function AgentCommissionsPage() {
  const t = useTranslations('AgentCommissions');
  const [filters, setFilters] = useState<CommissionFilters>(DEFAULT_FILTERS);

  const summaryQuery = useAgentCommissionsSummary();
  const listQuery = useAgentCommissions(filters);

  const summary = summaryQuery.data;
  const rows = listQuery.data?.data;
  const isError = summaryQuery.isError || listQuery.isError;
  const isLoading = summaryQuery.isLoading || listQuery.isLoading;
  const isEmpty = rows !== undefined && rows.length === 0;

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Coins} title={t('title')} description={t('subtitle')} />

      {isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => {
            void summaryQuery.refetch();
            void listQuery.refetch();
          }}
          retryLabel={t('retry')}
        />
      ) : isLoading || summary === undefined || rows === undefined ? (
        <AgentCommissionsSkeleton />
      ) : (
        <>
          <CommissionsSummaryTiles summary={summary} />
          <CommissionsFilterBar filters={filters} onChange={setFilters} />
          {isEmpty ? (
            <EmptyState
              framed
              icon={Coins}
              title={t('emptyTitle')}
              description={t('emptyDescription')}
            />
          ) : (
            <CommissionsTable rows={rows} />
          )}
        </>
      )}
    </div>
  );
}
