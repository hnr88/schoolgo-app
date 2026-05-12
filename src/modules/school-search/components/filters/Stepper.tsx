'use client';

import { useTranslations } from 'next-intl';
import { Minus, Plus } from 'lucide-react';
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
        aria-label={t('decrease', { label: ariaLabel })}
        className="flex size-9 items-center justify-center rounded text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus size={14} aria-hidden />
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
        aria-label={t('increase', { label: ariaLabel })}
        className="flex size-9 items-center justify-center rounded text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Plus size={14} aria-hidden />
      </button>
    </div>
  );
}
