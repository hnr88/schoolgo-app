'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WizardProgressProps } from '@/modules/forms/types/wizard.types';

export function WizardProgress({
  steps,
  activeIndex,
  onStepSelect,
  backLabel,
  className,
}: WizardProgressProps) {
  return (
    <ol className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => {
        const isComplete = index < activeIndex;
        const isActive = index === activeIndex;
        const isNavigable = isComplete && Boolean(onStepSelect);

        return (
          <li key={step.id} className='flex flex-1 items-center gap-2'>
            <button
              type='button'
              disabled={!isNavigable}
              onClick={isNavigable ? () => onStepSelect?.(index) : undefined}
              aria-current={isActive ? 'step' : undefined}
              aria-label={isNavigable && backLabel ? `${backLabel}: ${step.title}` : undefined}
              className={cn(
                'flex items-center gap-2 rounded-md px-1 py-1 text-left transition-opacity',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isNavigable && 'cursor-pointer hover:opacity-80',
                !isNavigable && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-md border text-sm font-semibold transition-colors',
                  isComplete && 'border-primary bg-primary text-primary-foreground',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  !isComplete && !isActive && 'border-border text-muted-foreground',
                )}
              >
                {isComplete ? <Check className='size-4' aria-hidden='true' /> : index + 1}
              </span>
              <span
                className={cn(
                  'hidden text-sm font-medium sm:inline',
                  isActive ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {step.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <span
                aria-hidden='true'
                className={cn(
                  'h-0.5 flex-1 rounded-full transition-colors',
                  isComplete ? 'bg-primary' : 'bg-border',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
