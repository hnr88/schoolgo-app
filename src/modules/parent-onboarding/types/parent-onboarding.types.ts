import type { ONBOARDING_STEP_IDS } from '@/modules/parent-onboarding/constants/parent-onboarding.constants';
import type { WizardChromeState } from '@/modules/forms';

export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export interface OnboardingRailProps {
  chrome: WizardChromeState;
}
