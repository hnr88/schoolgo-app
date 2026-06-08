'use client';

import { useTranslations } from 'next-intl';
import { WizardProgress } from '@/modules/forms';
import { Eyebrow } from '@/modules/design-system';
import type { OnboardingRailProps } from '@/modules/parent-onboarding/types/parent-onboarding.types';

export function OnboardingRail({ chrome }: OnboardingRailProps) {
  const t = useTranslations('ParentOnboarding');

  return (
    <div className='flex flex-col gap-8 lg:sticky lg:top-8'>
      <div className='flex flex-col gap-1 rounded-xl border border-gray-100 bg-card p-5 shadow-1'>
        <Eyebrow tone='brand'>{t('railTitle')}</Eyebrow>
        <span className='text-sm text-muted-foreground'>{t('railSubtitle')}</span>
      </div>

      <div className='hidden lg:block'>
        <WizardProgress
          steps={chrome.steps}
          activeIndex={chrome.stepIndex}
          onStepSelect={chrome.goTo}
          backLabel={chrome.backLabel}
          orientation='vertical'
        />
      </div>
    </div>
  );
}
