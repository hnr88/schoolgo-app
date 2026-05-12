'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';
import { SpecSchoolCard } from '@/modules/school-search/components/cards/SpecSchoolCard';
import { SortControl } from '@/modules/school-search/components/results/SortControl';
import { filterMockHits } from '@/modules/school-search/lib/filter-mock-hits';
import { MOCK_SCHOOL_HITS } from '@/modules/school-search/lib/mock-search-response';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SortOption } from '@/modules/school-search/types/filter.types';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

function sortHits(hits: readonly SchoolHit[], sortBy: SortOption): SchoolHit[] {
  const arr = [...hits];
  switch (sortBy) {
    case 'name-asc':
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case 'tuition-asc':
      return arr.sort(
        (a, b) => (a.annualTuitionFrom ?? Infinity) - (b.annualTuitionFrom ?? Infinity),
      );
    case 'tuition-desc':
      return arr.sort(
        (a, b) => (b.annualTuitionFrom ?? -Infinity) - (a.annualTuitionFrom ?? -Infinity),
      );
    case 'state':
      return arr.sort((a, b) => a.state.localeCompare(b.state));
    case 'enrolment-status': {
      const rank: Record<string, number> = { open: 0, limited: 1, waitlist: 2, closed: 3 };
      return arr.sort((a, b) => (rank[a.enrolmentStatus ?? ''] ?? 9) - (rank[b.enrolmentStatus ?? ''] ?? 9));
    }
    default:
      return arr;
  }
}

interface SpecResultsPanelProps {
  className?: string;
  alwaysOn?: boolean;
  floating?: boolean;
}

export function SpecResultsPanel({
  className,
  alwaysOn = false,
  floating = false,
}: SpecResultsPanelProps) {
  const t = useTranslations('SchoolSearch');
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isHydrated && isAuthenticated;

  const store = useSchoolSearchStore();

  const isActive = alwaysOn || searchParams.get('preview') === 'spec';

  const hits = useMemo(() => {
    if (!isActive) return [];
    const filtered = filterMockHits(MOCK_SCHOOL_HITS, {
      q: store.query || undefined,
      states: store.states.length ? store.states : undefined,
      sectors: store.sectors.length ? store.sectors : undefined,
      accommodation: store.accommodation.length ? store.accommodation : undefined,
      religiousAffiliations: store.religiousAffiliations.length
        ? store.religiousAffiliations
        : undefined,
      entryYearLevels: store.entryYearLevels.length ? store.entryYearLevels : undefined,
      feeMin: store.feeMin,
      feeMax: store.feeMax,
      atarAvailable: store.atarAvailable || undefined,
      englishLanguageSupport: store.englishLanguageSupport || undefined,
      sortBy: store.sortBy,
    });
    return sortHits(filtered.hits, store.sortBy);
  }, [
    isActive,
    store.query,
    store.states,
    store.sectors,
    store.accommodation,
    store.religiousAffiliations,
    store.entryYearLevels,
    store.feeMin,
    store.feeMax,
    store.atarAvailable,
    store.englishLanguageSupport,
    store.sortBy,
  ]);

  if (!isActive) return null;

  if (floating) {
    return (
      <aside
        className={cn(
          'absolute right-3 top-3 bottom-3 z-10 flex w-80 flex-col gap-2 overflow-hidden rounded-xl border border-border bg-card/95 shadow-2 backdrop-blur',
          className,
        )}
        data-testid="spec-results-panel"
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-divider px-3 py-2">
          <h2 className="text-sm font-semibold text-ink-900">{t('results.title')}</h2>
          <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-caption font-semibold text-primary">
            {t('results.count', { count: hits.length })}
          </span>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2 px-3">
          <SortControl isAdvanced={isAdvanced} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3">
          {hits.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              {t('results.empty')}
            </p>
          ) : (
            hits.map((hit) => (
              <SpecSchoolCard key={hit.documentId} hit={hit} isAdvanced={isAdvanced} />
            ))
          )}
        </div>
      </aside>
    );
  }

  return (
    <div
      className={cn('flex flex-1 flex-col gap-3 overflow-hidden', className)}
      data-testid="spec-results-panel"
    >
      <div className="flex items-center justify-between gap-3 px-1">
        <span className="text-xs font-semibold text-muted-foreground">
          {t('results.count', { count: hits.length })}
        </span>
        <SortControl isAdvanced={isAdvanced} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto pb-24 sm:grid-cols-2 xl:grid-cols-3">
        {hits.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            {t('results.empty')}
          </p>
        ) : (
          hits.map((hit) => (
            <SpecSchoolCard key={hit.documentId} hit={hit} isAdvanced={isAdvanced} />
          ))
        )}
      </div>
    </div>
  );
}
