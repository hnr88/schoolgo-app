import { cn } from '@/lib/utils';
import type { WizardStepProps } from '@/modules/forms/types/wizard.types';

export function WizardStep({ step, children, className }: WizardStepProps) {
  return (
    <section
      role='group'
      aria-label={step.title}
      className={cn('flex flex-col gap-8', className)}
    >
      {children}
    </section>
  );
}
