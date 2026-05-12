'use client';

import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface StepperProps {
  value: number | null;
  onChange: (next: number | null) => void;
  min: number;
  max: number;
  step?: number;
  ariaLabel: string;
  placeholder?: string;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  min,
  max,
  step = 1,
  ariaLabel,
  placeholder = '—',
  className,
}: StepperProps) {
  const t = useTranslations('SchoolSearch.spec.stepper');
  const current = value ?? min;
  const canDecrement = value != null && current > min;
  const canIncrement = value == null || current < max;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-border bg-background px-2 py-1',
        className,
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => canDecrement && onChange(Math.max(min, current - step))}
        disabled={!canDecrement}
        aria-label={`${ariaLabel}: ${t('decrease')}`}
        className="flex size-6 items-center justify-center rounded text-foreground hover:bg-muted disabled:opacity-30"
      >
        <Minus size={14} />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
        {value == null ? placeholder : value}
      </span>
      <button
        type="button"
        onClick={() => {
          if (value == null) {
            onChange(min);
            return;
          }
          if (canIncrement) onChange(Math.min(max, current + step));
        }}
        disabled={!canIncrement}
        aria-label={`${ariaLabel}: ${t('increase')}`}
        className="flex size-6 items-center justify-center rounded text-foreground hover:bg-muted disabled:opacity-30"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
