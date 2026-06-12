'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useSearchFiltersStore } from '@/modules/unified-search/stores/use-search-filters-store';

interface SearchFiltersToggleProps {
  className?: string;
}

export function SearchFiltersToggle({ className }: SearchFiltersToggleProps) {
  const t = useTranslations('UnifiedSearch.filters');
  const open = useSearchFiltersStore((s) => s.open);
  const toggle = useSearchFiltersStore((s) => s.toggle);

  const handleClick = () => {
    toggle();
    // Leaflet only re-tiles on window resize; nudge it once the sidebar finishes animating.
    if (typeof window !== 'undefined') {
      window.setTimeout(() => window.dispatchEvent(new Event('resize')), 320);
    }
  };

  return (
    <button
      type="button"
      aria-pressed={open}
      aria-label={open ? t('hide') : t('show')}
      onClick={handleClick}
      className={cn(
        'hidden h-9 shrink-0 items-center gap-1.5 rounded-pill border px-3 text-body-sm font-medium lg:inline-flex',
        'transition ease-out-quart motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        open
          ? 'border-transparent bg-rausch-50 text-rausch-700'
          : 'border-border bg-card text-foggy hover:bg-muted hover:text-ink-900',
        className,
      )}
    >
      <SlidersHorizontal className="size-4" strokeWidth={1.75} aria-hidden="true" />
      {t('label')}
    </button>
  );
}
