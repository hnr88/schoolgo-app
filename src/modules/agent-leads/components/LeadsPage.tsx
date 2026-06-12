'use client';

import { useTranslations } from 'next-intl';
import { Inbox } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading, SurfaceCard } from '@/modules/core';
import { useAgentLeads } from '@/modules/agent-leads/queries/use-agent-leads.query';
import { LeadsTable } from '@/modules/agent-leads/components/LeadsTable';

function TableSkeleton() {
  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-3'>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className='h-12 w-full rounded-md' />
      ))}
    </SurfaceCard>
  );
}

export function LeadsPage() {
  const t = useTranslations('AgentLeads');
  const query = useAgentLeads();

  const leads = query.data?.data;

  return (
    <div className='flex flex-col gap-4'>
      <SectionHeading title={t('title')} description={t('subtitle')} />
      {query.isLoading ? (
        <TableSkeleton />
      ) : query.isError || !leads ? (
        <ErrorState
          framed
          message={t('errorMessage')}
          onRetry={() => query.refetch()}
          retryLabel={t('retry')}
        />
      ) : leads.length === 0 ? (
        <EmptyState
          framed
          icon={Inbox}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : (
        <SurfaceCard padding='none' className='overflow-hidden'>
          <LeadsTable leads={leads} />
        </SurfaceCard>
      )}
    </div>
  );
}
