'use client';

import { useTranslations } from 'next-intl';
import { Wallet } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useAgentEarnings } from '@/modules/agent-payments/hooks/useAgentEarnings';
import { AgentEarningsSummary } from '@/modules/agent-payments/components/AgentEarningsSummary';
import { AgentPaymentsSkeleton } from '@/modules/agent-payments/components/AgentPaymentsSkeleton';
import { AgentPaymentsTable } from '@/modules/agent-payments/components/AgentPaymentsTable';

export function AgentPaymentsPage() {
  const t = useTranslations('AgentPayments');
  const earnings = useAgentEarnings();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Wallet} title={t('title')} description={t('subtitle')} />

      {earnings.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => earnings.refetch()}
          retryLabel={t('retry')}
        />
      ) : earnings.isLoading ? (
        <AgentPaymentsSkeleton />
      ) : earnings.isEmpty ? (
        <EmptyState framed icon={Wallet} title={t('emptyTitle')} description={t('emptyDescription')} />
      ) : (
        <>
          <AgentEarningsSummary summary={earnings.summary} />
          <AgentPaymentsTable payments={earnings.payments} />
        </>
      )}
    </div>
  );
}
