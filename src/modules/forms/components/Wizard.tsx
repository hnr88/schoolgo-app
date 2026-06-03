'use client';

import { useWizard } from '@/modules/forms/hooks/use-wizard';
import { useWizardNavigation } from '@/modules/forms/hooks/use-wizard-navigation';
import { WizardProgress } from '@/modules/forms/components/WizardProgress';
import { WizardStep } from '@/modules/forms/components/WizardStep';
import { WizardNav } from '@/modules/forms/components/WizardNav';
import { WizardLayout } from '@/modules/forms/components/WizardLayout';
import type { WizardChromeState, WizardProps } from '@/modules/forms/types/wizard.types';

export function Wizard({
  steps,
  children,
  labels,
  onFinish,
  canAdvance,
  initialStep,
  isSubmitting = false,
  className,
  header,
  aside,
  hideProgress = false,
}: WizardProps) {
  const { stepIndex, isFirst, isLast, isAdvancing, goNext, goBack, goTo } = useWizard({
    stepCount: steps.length,
    initialStep,
    canAdvance,
  });

  const { stepContainerRef, isFinishing, handleNext, handleFinish, handleKeyDown } =
    useWizardNavigation({ stepIndex, isLast, goNext, onFinish, canAdvance });

  const activeStep = steps[stepIndex];
  const isBusy = isAdvancing || isFinishing || isSubmitting;

  if (!activeStep) return null;

  const chrome: WizardChromeState = {
    stepIndex,
    stepCount: steps.length,
    activeStep,
    steps,
    goTo,
    backLabel: labels.back,
  };

  return (
    <WizardLayout
      ref={stepContainerRef}
      className={className}
      stepKey={stepIndex}
      onStepKeyDown={handleKeyDown}
      header={header?.(chrome)}
      aside={aside?.(chrome)}
      progress={
        !hideProgress ? (
          <WizardProgress
            steps={steps}
            activeIndex={stepIndex}
            onStepSelect={goTo}
            backLabel={labels.back}
          />
        ) : null
      }
      nav={
        <WizardNav
          labels={labels}
          isFirst={isFirst}
          isLast={isLast}
          isBusy={isBusy}
          onBack={goBack}
          onNext={() => void handleNext()}
          onFinish={() => void handleFinish()}
        />
      }
    >
      <WizardStep step={activeStep}>{children(activeStep, stepIndex, goTo)}</WizardStep>
    </WizardLayout>
  );
}
