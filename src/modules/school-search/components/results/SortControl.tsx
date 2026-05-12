'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ADVANCED_SORT_OPTIONS,
  BASIC_SORT_OPTIONS,
} from '@/modules/school-search/constants/filter-options.constants';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SortOption } from '@/modules/school-search/types/filter.types';

interface SortControlProps {
  isAdvanced: boolean;
  className?: string;
}

export function SortControl({ isAdvanced, className }: SortControlProps) {
  const t = useTranslations('SchoolSearch.spec.sort');
  const sortBy = useSchoolSearchStore((s) => s.sortBy);
  const setSortBy = useSchoolSearchStore((s) => s.setSortBy);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options = isAdvanced ? ADVANCED_SORT_OPTIONS : BASIC_SORT_OPTIONS;
  const currentLabelKey =
    options.find((o) => o.value === sortBy)?.labelKey ?? options[0]?.labelKey ?? 'sort.nameAsc';

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handlePick = (value: SortOption) => {
    setSortBy(value);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-pill border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted',
        )}
      >
        <span className="text-muted-foreground">{t('label')}</span>
        <span>{t(currentLabelKey.split('.').pop() as never)}</span>
        <ChevronDown size={12} aria-hidden />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1 flex w-64 flex-col gap-0.5 rounded-lg border border-border bg-card p-1 shadow-2"
        >
          {options.map((opt) => {
            const selected = opt.value === sortBy;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handlePick(opt.value)}
                  className={cn(
                    'flex w-full items-center justify-between rounded px-3 py-1.5 text-left text-xs font-medium transition-colors',
                    selected
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted',
                  )}
                >
                  {t(opt.labelKey.split('.').pop() as never)}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
