'use client';

import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/modules/core';
import type { Portal } from '@/lib/portal-url';
import type { SearchCapability } from '@/modules/unified-search';
import { cn } from '@/lib/utils';
import { SpecSchoolCard } from '@/modules/school-search/components/cards/SpecSchoolCard';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface SpecResultsListProps {
  hits: readonly SchoolHit[];
  isAdvanced: boolean;
  activePortal: Portal;
  capability?: SearchCapability;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  mapOpen?: boolean;
  className?: string;
  emptyClassName?: string;
}

const SKELETON_KEYS = ['a', 'b', 'c', 'd', 'e', 'f'] as const;

const GRID_MAP_OPEN = 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3';
const GRID_MAP_CLOSED = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

export function SpecResultsList({
  hits,
  isAdvanced,
  activePortal,
  capability,
  isLoading = false,
  isError = false,
  onRetry,
  mapOpen = false,
  className,
  emptyClassName,
}: SpecResultsListProps) {
  const t = useTranslations('SchoolSearch');

  const gridClassName = className ?? (mapOpen ? GRID_MAP_OPEN : GRID_MAP_CLOSED);

  if (isLoading) {
    return (
      <div className={gridClassName} aria-busy="true" aria-live="polite">
        <span className="sr-only">{t('spec.results.loading')}</span>
        {SKELETON_KEYS.map((key) => (
          <div key={key} className="flex flex-col gap-2 rounded-xl bg-card p-3 shadow-2">
            <Skeleton className="aspect-[3/2] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-12 rounded-pill" />
              <Skeleton className="h-6 w-14 rounded-pill" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn(emptyClassName)}>
        <ErrorState
          framed
          message={t('spec.results.errorDescription')}
          onRetry={onRetry}
          retryLabel={t('spec.results.retry')}
        />
      </div>
    );
  }

  if (hits.length === 0) {
    return (
      <div className={cn(emptyClassName)}>
        <EmptyState icon={SearchX} title={t('results.empty')} />
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {hits.map((hit, index) => (
        <SpecSchoolCard
          key={hit.documentId}
          hit={hit}
          isAdvanced={isAdvanced}
          activePortal={activePortal}
          capability={capability}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
