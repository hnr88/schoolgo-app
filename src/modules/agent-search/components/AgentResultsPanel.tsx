'use client';

import { UserSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { AgentCard } from '@/modules/design-system';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import { portalAgentProfilePath } from '@/modules/agent-search/lib/agent-paths';
import type { AgentResultsPanelProps } from '@/modules/agent-search/types/component.types';

export function AgentResultsPanel({ activePortal, className }: AgentResultsPanelProps) {
  const t = useTranslations('AgentSearch.results');
  const tContact = useTranslations('ContactAgent');
  const { data, isLoading, isFetching, isError, refetch } = useAgentSearchWithFilters();

  const hits = data?.data?.hits ?? [];
  const isRefetching = isFetching && !isLoading;

  return (
    <div className={cn('flex flex-1 flex-col', className)}>
      {isLoading && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-1'
            >
              <div className='flex items-start gap-4'>
                <Skeleton className='h-16 w-16 rounded-full' />
                <div className='flex flex-1 flex-col gap-2'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-3 w-1/2' />
                </div>
              </div>
              <Skeleton className='h-3 w-full' />
              <div className='flex gap-1.5'>
                <Skeleton className='h-5 w-16 rounded-pill' />
                <Skeleton className='h-5 w-14 rounded-pill' />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          framed
          message={t('error')}
          onRetry={() => {
            void refetch();
          }}
          retryLabel={t('retry')}
        />
      )}

      {!isLoading && !isError && hits.length === 0 && (
        <EmptyState framed icon={UserSearch} title={t('empty')} description={t('emptyHint')} />
      )}

      {!isLoading && !isError && hits.length > 0 && (
        <div
          className={cn(
            'grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 xl:grid-cols-3',
            isRefetching && 'pointer-events-none opacity-60',
          )}
          aria-busy={isRefetching}
        >
          {hits.map((agent) => (
            <AgentCard
              key={agent.documentId}
              name={agent.name}
              href={portalAgentProfilePath(activePortal, agent.slug ?? agent.documentId)}
              photoUrl={agent.photoUrl}
              headline={agent.headline}
              roleTitle={agent.roleTitle}
              countries={agent.countriesServed}
              verified={agent.verified}
              verifiedLabel={agent.verified ? t('verified') : undefined}
              partnerSchoolsCount={agent.partnerSchoolsCount}
              partnerSchoolsLabel={t('partnerSchools', { count: agent.partnerSchoolsCount })}
              agentDocumentId={agent.documentId}
              talkLabel={tContact('cardTriggerLabel')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
