'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useWizard } from '@/modules/forms/hooks/use-wizard';
import { WizardProgress } from '@/modules/forms/components/WizardProgress';
import { WizardStep } from '@/modules/forms/components/WizardStep';
import { WizardNav } from '@/modules/forms/components/WizardNav';
import type { WizardProps } from '@/modules/forms/types/wizard.types';

export function Wizard({
  steps,
  children,
  labels,
  onFinish,
  canAdvance,
  initialStep,
  isSubmitting = false,
  className,
}: WizardProps) {
  const [isFinishing, setIsFinishing] = useState(false);
  const { stepIndex, isFirst, isLast, isAdvancing, goNext, goBack } = useWizard({
    stepCount: steps.length,
    initialStep,
    canAdvance,
  });

  const activeStep = steps[stepIndex];

  async function handleFinish() {
    if (canAdvance && !(await canAdvance(stepIndex))) return;
    setIsFinishing(true);
    try {
      await onFinish();
    } finally {
      setIsFinishing(false);
    }
  }

  const isBusy = isAdvancing || isFinishing || isSubmitting;

  if (!activeStep) return null;

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <WizardProgress steps={steps} activeIndex={stepIndex} />
      <WizardStep step={activeStep}>{children(activeStep, stepIndex)}</WizardStep>
      <WizardNav
        labels={labels}
        isFirst={isFirst}
        isLast={isLast}
        isBusy={isBusy}
        onBack={goBack}
        onNext={() => void goNext()}
        onFinish={() => void handleFinish()}
      />
    </div>
  );
}
