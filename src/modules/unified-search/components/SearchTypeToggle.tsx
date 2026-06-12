'use client';

import { GraduationCap, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useSearchModeStore } from '@/modules/unified-search/stores/use-search-mode-store';
import type { SearchMode } from '@/modules/unified-search/types/unified-search.types';

interface SearchTypeToggleProps {
  className?: string;
}

const OPTIONS: { mode: SearchMode; icon: typeof GraduationCap; labelKey: 'schools' | 'agents' }[] = [
  { mode: 'schools', icon: GraduationCap, labelKey: 'schools' },
  { mode: 'agents', icon: Users, labelKey: 'agents' },
];

export function SearchTypeToggle({ className }: SearchTypeToggleProps) {
  const t = useTranslations('UnifiedSearch.toggle');
  const mode = useSearchModeStore((s) => s.mode);
  const setMode = useSearchModeStore((s) => s.setMode);

  return (
    <div
      role="group"
      aria-label={t('ariaLabel')}
      className={cn('inline-flex shrink-0 items-center gap-1 rounded-pill bg-muted p-1', className)}
    >
      {OPTIONS.map(({ mode: optionMode, icon: Icon, labelKey }) => {
        const isActive = mode === optionMode;
        return (
          <button
            key={optionMode}
            type="button"
            aria-pressed={isActive}
            onClick={() => setMode(optionMode)}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-pill px-4 text-body-sm font-medium',
              'transition ease-out-quart motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted',
              isActive
                ? 'bg-card text-ink-900 shadow-2 font-semibold'
                : 'text-foggy hover:text-ink-900',
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
