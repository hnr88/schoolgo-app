'use client';

import { cn } from '@/lib/utils';
import type { FilterOption } from '@/modules/school-search/constants/filter-options.constants';

type FilterChipGroupProps<T extends string> = {
  options: readonly FilterOption<T>[];
  value: T[] | T | null;
  onChange: (next: T[] | T | null) => void;
  multi: boolean;
  ariaLabel: string;
  size?: 'sm' | 'md';
  getLabel: (option: FilterOption<T>) => string;
  className?: string;
  buttonClassName?: string;
};

function isSelected<T extends string>(
  value: T[] | T | null,
  optionValue: T,
  multi: boolean,
): boolean {
  if (multi) {
    return Array.isArray(value) && value.includes(optionValue);
  }
  return value === optionValue;
}

function handleToggle<T extends string>(
  current: T[] | T | null,
  optionValue: T,
  multi: boolean,
): T[] | T | null {
  if (multi) {
    const arr = Array.isArray(current) ? current : [];
    return arr.includes(optionValue)
      ? arr.filter((v) => v !== optionValue)
      : [...arr, optionValue];
  }
  return current === optionValue ? null : optionValue;
}

export function FilterChipGroup<T extends string>({
  options,
  value,
  onChange,
  multi,
  ariaLabel,
  size = 'md',
  getLabel,
  className,
  buttonClassName,
}: FilterChipGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {options.map((option) => {
        const selected = isSelected(value, option.value, multi);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(handleToggle(value, option.value, multi))}
            className={cn(
              'inline-flex shrink-0 cursor-pointer items-center rounded-pill border px-3 font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'disabled:pointer-events-none disabled:opacity-50',
              size === 'sm' ? 'py-1 text-xs' : 'py-1.5 text-sm',
              selected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:bg-muted',
              buttonClassName,
            )}
          >
            {getLabel(option)}
          </button>
        );
      })}
    </div>
  );
}
