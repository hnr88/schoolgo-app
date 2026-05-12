'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Bookmark, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/modules/auth';
import { useSavedSearches } from '@/modules/school-search/queries/use-saved-searches.query';
import { useDeleteSavedSearch } from '@/modules/school-search/queries/use-delete-saved-search.mutation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SavedSearch } from '@/modules/school-search/types/saved-searches.types';
import type { TypedSearchRequest } from '@/modules/school-search/types/search-api.types';

interface SavedSearchesPanelProps {
  className?: string;
}

export function SavedSearchesPanel({ className }: SavedSearchesPanelProps) {
  const t = useTranslations('SchoolSearch.savedSearches');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data, isLoading } = useSavedSearches();
  const deleteSavedSearch = useDeleteSavedSearch();

  const setQuery = useSchoolSearchStore((s) => s.setQuery);
  const setSuburb = useSchoolSearchStore((s) => s.setSuburb);
  const setPostcode = useSchoolSearchStore((s) => s.setPostcode);
  const setStates = useSchoolSearchStore((s) => s.setStates);
  const setFeeRange = useSchoolSearchStore((s) => s.setFeeRange);
  const setEntryYearLevels = useSchoolSearchStore((s) => s.setEntryYearLevels);
  const setStudentAge = useSchoolSearchStore((s) => s.setStudentAge);
  const setAtarAvailable = useSchoolSearchStore((s) => s.setAtarAvailable);
  const setEnglishLanguageSupport = useSchoolSearchStore(
    (s) => s.setEnglishLanguageSupport,
  );
  const setEnglishTest = useSchoolSearchStore((s) => s.setEnglishTest);
  const setSortBy = useSchoolSearchStore((s) => s.setSortBy);

  const applyFromFilterState = (filterState: TypedSearchRequest) => {
    if (filterState.q !== undefined) setQuery(filterState.q);
    if (filterState.suburb !== undefined) setSuburb(filterState.suburb);
    if (filterState.postcode !== undefined) setPostcode(filterState.postcode);
    if (filterState.states !== undefined) setStates(filterState.states);
    if (filterState.feeMin !== undefined || filterState.feeMax !== undefined) {
      setFeeRange(filterState.feeMin ?? 0, filterState.feeMax ?? Number.MAX_SAFE_INTEGER);
    }
    if (filterState.entryYearLevels !== undefined) {
      setEntryYearLevels(filterState.entryYearLevels);
    }
    if (filterState.studentAge !== undefined) setStudentAge(filterState.studentAge);
    if (filterState.atarAvailable !== undefined) {
      setAtarAvailable(filterState.atarAvailable);
    }
    if (filterState.englishLanguageSupport !== undefined) {
      setEnglishLanguageSupport(filterState.englishLanguageSupport);
    }
    if (filterState.englishTest !== undefined) setEnglishTest(filterState.englishTest);
    if (filterState.sortBy !== undefined) setSortBy(filterState.sortBy);
  };

  if (!isAuthenticated) {
    return (
      <div className={className}>
        <p className="py-6 text-center text-sm text-muted-foreground">
          {t('signInRequired')}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={className}>
        <ul className="flex flex-col gap-2">
          <li className="h-12 animate-pulse rounded-md border border-border bg-muted" />
          <li className="h-12 animate-pulse rounded-md border border-border bg-muted" />
          <li className="h-12 animate-pulse rounded-md border border-border bg-muted" />
        </ul>
      </div>
    );
  }

  const items: SavedSearch[] = data?.data ?? [];

  if (items.length === 0) {
    return (
      <div className={className}>
        <p className="py-6 text-center text-sm text-muted-foreground">{t('empty')}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t('heading')}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((s) => (
          <li
            key={s.documentId}
            className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-foreground">
                {s.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {t('lastResultCount', { count: s.lastResultCount })}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => applyFromFilterState(s.filterState)}
                aria-label={t('applyCta')}
              >
                <Bookmark size={14} aria-hidden />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  deleteSavedSearch.mutate(s.documentId, {
                    onError: () => toast.error(t('deleteCta')),
                  });
                }}
                aria-label={t('deleteCta')}
                disabled={deleteSavedSearch.isPending}
              >
                <Trash2 size={14} aria-hidden />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
