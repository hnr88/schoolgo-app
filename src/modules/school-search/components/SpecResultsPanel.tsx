'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SortControl } from '@/modules/school-search/components/results/SortControl';
import { SpecResultsList } from '@/modules/school-search/components/SpecResultsList';
import { SpecResultsPanelHeader } from '@/modules/school-search/components/SpecResultsPanelHeader';
import { useFilteredSpecHits } from '@/modules/school-search/hooks/useFilteredSpecHits';

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
  const isActive = alwaysOn || searchParams.get('preview') === 'spec';
  const { hits, isAdvanced } = useFilteredSpecHits(isActive);

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
        <SpecResultsPanelHeader count={hits.length} />
        <div className="flex shrink-0 items-center justify-end gap-2 px-3">
          <SortControl isAdvanced={isAdvanced} />
        </div>
        <SpecResultsList
          hits={hits}
          isAdvanced={isAdvanced}
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3"
        />
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
      <SpecResultsList
        hits={hits}
        isAdvanced={isAdvanced}
        className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto pb-24 sm:grid-cols-2 xl:grid-cols-3"
        emptyClassName="col-span-full"
      />
    </div>
  );
}
