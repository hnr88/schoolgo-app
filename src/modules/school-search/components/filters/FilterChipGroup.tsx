'use client';

import { cn } from '@/lib/utils';
import type { FilterOption } from '@/modules/school-search/constants/filter-options.constants';
import type { IconComponent } from '@/modules/design-system/types/design-system.types';

type FilterChipGroupProps<T extends string> = {
  options: readonly FilterOption<T>[];
  value: T[] | T | null;
  onChange: (next: T[] | T | null) => void;
  multi: boolean;
  ariaLabel: string;
  size?: 'sm' | 'md';
  getLabel: (option: FilterOption<T>) => string;
  getIcon?: (option: FilterOption<T>) => IconComponent | undefined;
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
  getLabel,
  getIcon,
  className,
  buttonClassName,
}: FilterChipGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap items-center gap-1.5', className)}
    >
      {options.map((option) => {
        const selected = isSelected(value, option.value, multi);
        const Icon = getIcon?.(option);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(handleToggle(value, option.value, multi))}
            className={cn(
              'inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-pill px-3 text-body-sm',
              'transition-colors ease-out-quart motion-reduce:transition-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              selected
                ? 'bg-ink-900 font-semibold text-card'
                : 'bg-muted font-medium text-ink-900 hover:bg-divider',
              buttonClassName,
            )}
          >
            {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
            {getLabel(option)}
          </button>
        );
      })}
    </div>
  );
}
