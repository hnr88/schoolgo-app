'use client';

import { useTranslations } from 'next-intl';
import { Receipt } from 'lucide-react';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useAgentInvoices } from '@/modules/agent-invoices/queries/use-agent-invoices.query';
import { AgentInvoicesSkeleton } from '@/modules/agent-invoices/components/AgentInvoicesSkeleton';
import { AgentInvoicesTable } from '@/modules/agent-invoices/components/AgentInvoicesTable';

export function AgentInvoicesPage() {
  const t = useTranslations('AgentInvoices');
  const invoicesQuery = useAgentInvoices();
  const invoices = invoicesQuery.data ?? [];

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading level={1} icon={Receipt} title={t('title')} description={t('subtitle')} />

      {invoicesQuery.isError ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => invoicesQuery.refetch()}
          retryLabel={t('retry')}
        />
      ) : invoicesQuery.isLoading ? (
        <AgentInvoicesSkeleton />
      ) : invoices.length === 0 ? (
        <EmptyState
          framed
          icon={Receipt}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <AgentInvoicesTable invoices={invoices} />
      )}
    </div>
  );
}
