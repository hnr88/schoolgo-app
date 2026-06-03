'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { useWizard } from '@/modules/forms/hooks/use-wizard';
import { WizardProgress } from '@/modules/forms/components/WizardProgress';
import { WizardStep } from '@/modules/forms/components/WizardStep';
import { WizardNav } from '@/modules/forms/components/WizardNav';
import { isSingleLineFormControl } from '@/modules/forms/lib/wizard-keyboard';
import { focusFirstInvalid } from '@/modules/forms/lib/wizard-focus';
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
  const { stepIndex, isFirst, isLast, isAdvancing, goNext, goBack, goTo } = useWizard({
    stepCount: steps.length,
    initialStep,
    canAdvance,
  });

  const stepContainerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  const activeStep = steps[stepIndex];

  function focusInvalidSoon() {
    if (typeof requestAnimationFrame === 'undefined') {
      focusFirstInvalid(stepContainerRef.current);
      return;
    }
    requestAnimationFrame(() => focusFirstInvalid(stepContainerRef.current));
  }

  async function handleNext() {
    const advanced = await goNext();
    if (!advanced) focusInvalidSoon();
  }

  async function handleFinish() {
    if (canAdvance && !(await canAdvance(stepIndex))) {
      focusInvalidSoon();
      return;
    }
    setIsFinishing(true);
    try {
      await onFinish();
    } finally {
      setIsFinishing(false);
    }
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const container = stepContainerRef.current;
    if (!container) return;
    const focusable = container.querySelector<HTMLElement>(
      'input:not([type="hidden"]), select, textarea, button, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }, [stepIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter') return;
    if (!isSingleLineFormControl(event.target)) return;
    event.preventDefault();
    if (isLast) {
      void handleFinish();
      return;
    }
    void handleNext();
  }

  const isBusy = isAdvancing || isFinishing || isSubmitting;

  if (!activeStep) return null;

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <WizardProgress
        steps={steps}
        activeIndex={stepIndex}
        onStepSelect={goTo}
        backLabel={labels.back}
      />
      <div ref={stepContainerRef} onKeyDown={handleKeyDown}>
        <WizardStep step={activeStep}>{children(activeStep, stepIndex)}</WizardStep>
      </div>
      <WizardNav
        labels={labels}
        isFirst={isFirst}
        isLast={isLast}
        isBusy={isBusy}
        onBack={goBack}
        onNext={() => void handleNext()}
        onFinish={() => void handleFinish()}
      />
    </div>
  );
}
