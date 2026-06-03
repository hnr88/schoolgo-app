import { ONBOARDING_STEPS } from '@/modules/onboarding/constants/onboarding.constants';
import type {
  OnboardingProgress,
  OnboardingStepSignals,
} from '@/modules/onboarding/types/onboarding.types';

export function computeCompleteness(signals: OnboardingStepSignals): OnboardingProgress {
  const doneByKey: Record<string, boolean> = {
    completeProfile: signals.hasProfile,
    addChild: signals.hasChild,
    saveSchools: signals.hasSavedSchool,
    firstApplication: signals.hasApplication,
  };

  const steps = ONBOARDING_STEPS.map((step) => ({
    key: step.key,
    done: doneByKey[step.key] ?? false,
  }));

  const total = steps.length;
  const completedCount = steps.filter((step) => step.done).length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return { steps, completedCount, total, percent };
}
