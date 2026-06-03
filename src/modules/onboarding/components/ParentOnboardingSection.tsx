'use client';

import { OnboardingChecklist } from '@/modules/onboarding/components/OnboardingChecklist';
import { useOnboardingProgress } from '@/modules/onboarding/hooks/useOnboardingProgress';
import { useOnboardingStore } from '@/modules/onboarding/stores/use-onboarding-store';

export function ParentOnboardingSection() {
  const { progress, isLoading } = useOnboardingProgress();
  const dismissed = useOnboardingStore((s) => s.dismissed);

  if (isLoading || dismissed || progress.percent >= 100) {
    return null;
  }

  return <OnboardingChecklist progress={progress} />;
}
