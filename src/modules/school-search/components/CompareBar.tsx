'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import {
  COMPARE_MAX_ADVANCED,
  COMPARE_MAX_BASIC,
} from '@/modules/school-search/constants/filter-options.constants';
import { MOCK_SCHOOL_HITS } from '@/modules/school-search/lib/mock-search-response';
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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isAdvancedProp ?? (isHydrated && isAuthenticated);
  const compareList = useSchoolSearchStore((s) => s.compareList);
  const toggleCompare = useSchoolSearchStore((s) => s.toggleCompare);

  const schoolNamesById = useMemo(() => {
    if (schoolNamesByIdProp) return schoolNamesByIdProp;
    return Object.fromEntries(MOCK_SCHOOL_HITS.map((h) => [h.documentId, h.name]));
  }, [schoolNamesByIdProp]);

  if (compareList.length === 0) return null;

  const max = isAdvanced ? COMPARE_MAX_ADVANCED : COMPARE_MAX_BASIC;
  const compareHref = `/compare?ids=${compareList.join(',')}`;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur',
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
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
        <Link
          href={compareHref}
          aria-disabled={compareList.length === 0}
          className={cn(
            'shrink-0 rounded-pill bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-1 hover:bg-primary/90',
            compareList.length === 0 && 'pointer-events-none opacity-50',
          )}
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
