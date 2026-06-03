'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WizardStepConfig } from '@/modules/forms/types/wizard.types';

interface WizardProgressStepProps {
  step: WizardStepConfig;
  index: number;
  activeIndex: number;
  total: number;
  orientation: 'horizontal' | 'vertical';
  onStepSelect?: (index: number) => void;
  backLabel?: string;
}

export function WizardProgressStep({
  step,
  index,
  activeIndex,
  total,
  orientation,
  onStepSelect,
  backLabel,
}: WizardProgressStepProps) {
  const isComplete = index < activeIndex;
  const isActive = index === activeIndex;
  const isNavigable = isComplete && Boolean(onStepSelect);
  const isLast = index === total - 1;
  const isVertical = orientation === 'vertical';

  return (
    <li className={cn('flex gap-3', isVertical ? 'flex-col' : 'flex-1 items-center')}>
      <button
        type='button'
        disabled={!isNavigable}
        onClick={isNavigable ? () => onStepSelect?.(index) : undefined}
        aria-current={isActive ? 'step' : undefined}
        aria-label={isNavigable && backLabel ? `${backLabel}: ${step.title}` : undefined}
        className={cn(
          'group flex items-center gap-3 rounded-md text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isNavigable ? 'cursor-pointer' : 'cursor-default',
          isVertical ? 'w-full px-1 py-1' : 'min-w-0',
        )}
      >
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold',
            'transition-colors duration-300 ease-out-quart',
            isComplete && 'border-primary bg-primary text-primary-foreground',
            isActive &&
              'border-primary bg-primary text-primary-foreground shadow-brand ring-4 ring-primary/15',
            !isComplete && !isActive && 'border-border bg-card text-muted-foreground',
            isNavigable && 'group-hover:border-primary/60',
          )}
        >
          {isComplete ? <Check className='size-4' aria-hidden='true' /> : index + 1}
        </span>
        <span
          className={cn(
            'min-w-0 truncate text-sm font-medium transition-colors duration-300 ease-out-quart',
            isVertical ? 'inline' : 'hidden sm:inline',
            isActive ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {step.title}
        </span>
      </button>
      {!isLast && (
        <span
          aria-hidden='true'
          className={cn(
            'rounded-full transition-colors duration-300 ease-out-quart',
            isVertical ? 'ml-4 h-6 w-0.5' : 'h-0.5 flex-1',
            isComplete ? 'bg-primary' : 'bg-border',
          )}
        />
      )}
    </li>
  );
}
