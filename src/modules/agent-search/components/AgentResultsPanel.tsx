'use client';

import { LogIn, UserSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import { AgentCard } from '@/modules/design-system';
import { SearchTeaserOverlay } from '@/modules/unified-search';
import { useAgentSearchWithFilters } from '@/modules/agent-search/hooks/useAgentSearchWithFilters';
import { portalAgentProfilePath } from '@/modules/agent-search/lib/agent-paths';
import { AgentSortControl } from '@/modules/agent-search/components/AgentSortControl';
import type { AgentResultsPanelProps } from '@/modules/agent-search/types/component.types';

const GRID_TRANSITION = 'transition-opacity duration-200';
const GRID_MAP_OPEN = 'grid grid-cols-1 gap-4 sm:grid-cols-2';
const GRID_MAP_CLOSED = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

export function AgentResultsPanel({
  activePortal,
  capability,
  mapOpen = false,
  className,
}: AgentResultsPanelProps) {
  const t = useTranslations('AgentSearch.results');
  const tHeader = useTranslations('AgentSearch.header');
  const tContact = useTranslations('ContactAgent');
  const tGating = useTranslations('AgentSearch.gating');
  const { data, isLoading, isFetching, isError, refetch } = useAgentSearchWithFilters(capability);

  const allHits = data?.data?.hits ?? [];
  const total = data?.data?.total ?? allHits.length;
  const { resultCap, canContact } = capability;
  const hits = resultCap === null ? allHits : allHits.slice(0, resultCap);
  const isRefetching = isFetching && !isLoading;

  const gridClassName = cn(
    GRID_TRANSITION,
    mapOpen ? GRID_MAP_OPEN : GRID_MAP_CLOSED,
  );

  const signInCta = (
    <Link
      href="/sign-in"
      className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-4 py-2.5 text-body-sm font-semibold text-on-primary shadow-brand transition-colors hover:bg-rausch-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <LogIn className="h-4 w-4" aria-hidden="true" />
      {tGating('signInToContact')}
    </Link>
  );

  return (
    <div className={cn('flex flex-1 flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-3 px-1">
        <span className="text-xs font-semibold text-muted-foreground">
          {isLoading ? tHeader('countLoading') : tHeader('count', { count: total })}
        </span>
        <AgentSortControl />
      </div>

      {isLoading && (
        <div className={gridClassName}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-16 rounded-pill" />
                <Skeleton className="h-5 w-14 rounded-pill" />
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
        <SearchTeaserOverlay locked={resultCap !== null} resultCap={resultCap ?? total} total={total}>
          <div
            className={cn(gridClassName, isRefetching && 'pointer-events-none opacity-60')}
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
                agentDocumentId={canContact ? agent.documentId : undefined}
                talkLabel={canContact ? tContact('cardTriggerLabel') : undefined}
                actionSlot={canContact ? undefined : signInCta}
              />
            ))}
          </div>
        </SearchTeaserOverlay>
      )}
    </div>
  );
}
