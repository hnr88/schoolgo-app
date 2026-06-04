'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedRadioGroupProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly SegmentedOption[];
  ariaLabel: string;
  className?: string;
}

export function SegmentedRadioGroup({
  value,
  onValueChange,
  options,
  ariaLabel,
  className,
}: SegmentedRadioGroupProps) {
  return (
    <RadioGroup
      value={value ?? ''}
      onValueChange={onValueChange}
      aria-label={ariaLabel}
      className={cn('grid gap-3', className)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex h-12 cursor-pointer items-center justify-center rounded-xl border border-gray-100 bg-background px-4 text-sm font-medium text-ink-900 transition-colors',
            'hover:bg-muted/40',
            'has-[[data-checked]]:border-primary has-[[data-checked]]:bg-rausch-50 has-[[data-checked]]:text-primary-strong',
            'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
          )}
        >
          <RadioGroupItem value={option.value} className='sr-only' />
          {option.label}
        </label>
      ))}
    </RadioGroup>
  );
}
