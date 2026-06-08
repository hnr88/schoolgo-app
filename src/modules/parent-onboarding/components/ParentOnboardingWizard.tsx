'use client';

import { useTranslations } from 'next-intl';
import { Form } from '@/components/ui/form';
import { Wizard } from '@/modules/forms';
import type { ParentMe } from '@/modules/parent-settings';
import {
  ONBOARDING_STEP_IDS,
  STEP_TITLE_KEYS,
} from '@/modules/parent-onboarding/constants/parent-onboarding.constants';
import { useParentOnboarding } from '@/modules/parent-onboarding/hooks/use-parent-onboarding';
import { OnboardingWizardHeader } from '@/modules/parent-onboarding/components/OnboardingWizardHeader';
import { OnboardingRail } from '@/modules/parent-onboarding/components/OnboardingRail';
import { StepIdentity } from '@/modules/parent-onboarding/components/StepIdentity';
import { StepContact } from '@/modules/parent-onboarding/components/StepContact';
import { StepAddress } from '@/modules/parent-onboarding/components/StepAddress';
import { StepEmergency } from '@/modules/parent-onboarding/components/StepEmergency';

export function ParentOnboardingWizard({ me }: { me: ParentMe }) {
  const t = useTranslations('ParentOnboarding');
  const { form, canAdvance, onFinish, isSubmitting } = useParentOnboarding(me);

  const steps = ONBOARDING_STEP_IDS.map((id) => ({
    id,
    title: t(STEP_TITLE_KEYS[id]),
  }));

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Wizard
          steps={steps}
          labels={{ back: t('back'), next: t('next'), finish: t('finish') }}
          canAdvance={canAdvance}
          onFinish={onFinish}
          isSubmitting={isSubmitting}
          hideProgress
          header={(chrome) => <OnboardingWizardHeader {...chrome} />}
          aside={(chrome) => <OnboardingRail chrome={chrome} />}
        >
          {(step) => {
            switch (step.id) {
              case 'identity':
                return <StepIdentity control={form.control} />;
              case 'contact':
                return <StepContact control={form.control} />;
              case 'address':
                return <StepAddress control={form.control} />;
              case 'emergency':
                return <StepEmergency control={form.control} />;
              default:
                return null;
            }
          }}
        </Wizard>
      </form>
    </Form>
  );
}
