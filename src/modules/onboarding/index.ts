export { ParentOnboardingSection } from '@/modules/onboarding/components/ParentOnboardingSection';
export { OnboardingChecklist } from '@/modules/onboarding/components/OnboardingChecklist';
export { useOnboardingProgress } from '@/modules/onboarding/hooks/useOnboardingProgress';
export { useOnboardingStore } from '@/modules/onboarding/stores/use-onboarding-store';
export { computeCompleteness } from '@/modules/onboarding/lib/compute-completeness';
export { ONBOARDING_STEPS } from '@/modules/onboarding/constants/onboarding.constants';
export type {
  OnboardingStepKey,
  OnboardingStepConfig,
  OnboardingStepSignals,
  OnboardingStepState,
  OnboardingProgress,
} from '@/modules/onboarding/types/onboarding.types';
