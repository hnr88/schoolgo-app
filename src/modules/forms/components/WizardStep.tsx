import { cn } from '@/lib/utils';
import type { WizardStepProps } from '@/modules/forms/types/wizard.types';

export function WizardStep({ step, children, className }: WizardStepProps) {
  return (
    <section
      role='group'
      aria-labelledby={`wizard-step-${step.id}-title`}
      className={cn('flex flex-col gap-6', className)}
    >
      <h2
        id={`wizard-step-${step.id}-title`}
        className='text-xl font-semibold tracking-tight text-foreground'
      >
        {step.title}
      </h2>
      {children}
    </section>
  );
}
