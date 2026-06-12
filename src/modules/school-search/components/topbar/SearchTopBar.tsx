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
        'flex shrink-0 flex-col gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-1',
        className,
      )}
      data-testid="spec-top-bar"
    >
      <AnnualFeeSlider />
      <div className="flex flex-wrap items-center gap-1.5">
        <QuickFilterChips />
      </div>
    </div>
  );
}
