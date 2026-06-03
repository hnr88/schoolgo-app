'use client';

import { cn } from '@/lib/utils';
import { WizardProgressStep } from '@/modules/forms/components/WizardProgressStep';
import type { WizardProgressProps } from '@/modules/forms/types/wizard.types';

export function WizardProgress({
  steps,
  activeIndex,
  onStepSelect,
  backLabel,
  orientation = 'horizontal',
  className,
}: WizardProgressProps) {
  const isVertical = orientation === 'vertical';

  return (
    <ol
      className={cn(
        isVertical ? 'flex flex-col gap-0' : 'flex items-center gap-2',
        className,
      )}
    >
      {steps.map((step, index) => (
        <WizardProgressStep
          key={step.id}
          step={step}
          index={index}
          activeIndex={activeIndex}
          total={steps.length}
          orientation={orientation}
          onStepSelect={onStepSelect}
          backLabel={backLabel}
        />
      ))}
    </ol>
  );
}
