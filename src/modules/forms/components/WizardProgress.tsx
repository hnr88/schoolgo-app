import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WizardProgressProps } from '@/modules/forms/types/wizard.types';

export function WizardProgress({ steps, activeIndex, className }: WizardProgressProps) {
  return (
    <ol className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => {
        const isComplete = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <li
            key={step.id}
            aria-current={isActive ? 'step' : undefined}
            className='flex items-center gap-2'
          >
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-full border text-sm font-medium transition-colors',
                isComplete && 'border-primary bg-primary text-primary-foreground',
                isActive && 'border-primary text-primary',
                !isComplete && !isActive && 'border-border text-muted-foreground',
              )}
            >
              {isComplete ? (
                <Check className='size-4' aria-hidden='true' />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                'text-sm font-medium',
                isActive ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <span
                aria-hidden='true'
                className={cn(
                  'h-px w-6 transition-colors',
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
