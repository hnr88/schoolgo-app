'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import type { Portal } from '@/lib/portal-url';
import { cn } from '@/lib/utils';
import { SpecSchoolCard } from '@/modules/school-search/components/cards/SpecSchoolCard';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface SpecResultsListProps {
  hits: readonly SchoolHit[];
  isAdvanced: boolean;
  activePortal: Portal;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  className?: string;
  emptyClassName?: string;
}

const SKELETON_KEYS = ['a', 'b', 'c', 'd', 'e', 'f'] as const;

export function SpecResultsList({
  hits,
  isAdvanced,
  activePortal,
  isLoading = false,
  isError = false,
  onRetry,
  className,
  emptyClassName,
}: SpecResultsListProps) {
  const t = useTranslations('SchoolSearch');

  if (isLoading) {
    return (
      <div className={className} aria-busy="true" aria-live="polite">
        <span className="sr-only">{t('spec.results.loading')}</span>
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-1"
          >
            <Skeleton className="aspect-[16/10] w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-4 w-12 rounded-pill" />
              <Skeleton className="h-4 w-14 rounded-pill" />
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
      <p className={cn('py-12 text-center text-sm text-muted-foreground', emptyClassName)}>
        {t('results.empty')}
      </p>
    );
  }

  return (
    <div className={className}>
      {hits.map((hit, index) => (
        <SpecSchoolCard
          key={hit.documentId}
          hit={hit}
          isAdvanced={isAdvanced}
          activePortal={activePortal}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
