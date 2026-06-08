'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ParentIdentityFields } from '@/modules/parent-settings';
import type { ProfileValues } from '@/modules/parent-settings';
import { OnboardingStepCard } from '@/modules/parent-onboarding/components/OnboardingStepCard';
import {
  STEP_DESCRIPTION_KEYS,
  STEP_TITLE_KEYS,
} from '@/modules/parent-onboarding/constants/parent-onboarding.constants';

export function StepIdentity({ control }: { control: Control<ProfileValues> }) {
  const t = useTranslations('ParentOnboarding');

  return (
    <OnboardingStepCard
      title={t(STEP_TITLE_KEYS.identity)}
      description={t(STEP_DESCRIPTION_KEYS.identity)}
    >
      <ParentIdentityFields control={control} />
    </OnboardingStepCard>
  );
}
