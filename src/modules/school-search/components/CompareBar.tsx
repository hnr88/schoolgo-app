'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/modules/auth';
import {
  COMPARE_MAX_ADVANCED,
  COMPARE_MAX_BASIC,
} from '@/modules/school-search/constants/filter-options.constants';
import { useCompareSchools } from '@/modules/school-search/queries/use-compare-schools.query';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

interface CompareBarProps {
  isAdvanced?: boolean;
  schoolNamesById?: Record<string, string>;
  className?: string;
}

export function CompareBar({
  isAdvanced: isAdvancedProp,
  schoolNamesById: schoolNamesByIdProp,
  className,
}: CompareBarProps) {
  const t = useTranslations('SchoolSearch.spec.compareBar');
  const tCompare = useTranslations('SchoolSearch.compare');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isAdvancedProp ?? (isHydrated && isAuthenticated);
  const compareList = useSchoolSearchStore((s) => s.compareList);
  const toggleCompare = useSchoolSearchStore((s) => s.toggleCompare);
  const { data: compareData } = useCompareSchools(compareList);

  const schoolNamesById = useMemo(() => {
    if (schoolNamesByIdProp) return schoolNamesByIdProp;
    return Object.fromEntries(compareData?.data.map((h) => [h.id, h.name]) ?? []);
  }, [schoolNamesByIdProp, compareData]);

  if (compareList.length === 0) return null;

  const max = isAdvanced ? COMPARE_MAX_ADVANCED : COMPARE_MAX_BASIC;
  const compareHref = `/compare?ids=${compareList.join(',')}`;

  const handleClearAll = () => {
    useSchoolSearchStore.setState({ compareList: [] });
  };

  return (
    <div
      role="region"
      aria-label={tCompare('regionLabel')}
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card shadow-3 animate-in slide-in-from-bottom duration-300',
        className,
      )}
      data-testid="spec-compare-bar"
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="shrink-0 text-xs font-semibold text-muted-foreground">
            {t('label', { count: compareList.length, max })}
          </span>
          {compareList.map((id) => {
            const name = schoolNamesById[id] ?? id;
            return (
              <span
                key={id}
                className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <span className="max-w-32 truncate">{name}</span>
                <button
                  type="button"
                  onClick={() => toggleCompare(id, max)}
                  aria-label={t('remove', { name })}
                  className="h-6 w-6 rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X size={12} aria-hidden />
                </button>
              </span>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={compareHref}
            aria-disabled={compareList.length === 0}
            className={cn(
              'shrink-0 rounded-pill bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-brand hover:bg-primary/90',
              compareList.length === 0 && 'pointer-events-none opacity-50',
            )}
          >
            {t('cta')}
          </Link>
          <button
            type="button"
            onClick={handleClearAll}
            aria-label={tCompare('clearAll')}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
