'use client';

import { cn } from '@/lib/utils';
import { AnnualFeeSlider } from '@/modules/school-search/components/topbar/AnnualFeeSlider';
import { QuickFilterChips } from '@/modules/school-search/components/topbar/QuickFilterChips';

interface SearchTopBarProps {
  className?: string;
}

export function SearchTopBar({ className }: SearchTopBarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-2',
        className,
      )}
      data-testid="spec-top-bar"
    >
      <AnnualFeeSlider />
      <div className="flex flex-wrap items-center gap-2">
        <QuickFilterChips />
      </div>
    </div>
  );
}
