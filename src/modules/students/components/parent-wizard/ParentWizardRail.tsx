'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { WizardProgress } from '@/modules/forms';
import type { WizardChromeState } from '@/modules/forms';
import { Eyebrow } from '@/modules/design-system';

interface ParentWizardRailProps {
  chrome: WizardChromeState;
  studentName: string;
}

export function ParentWizardRail({ chrome, studentName }: ParentWizardRailProps) {
  const t = useTranslations('StudentWizard');
  const trimmedName = studentName.trim();

  return (
    <div className='flex flex-col gap-8 lg:sticky lg:top-8'>
      <div className='flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-1'>
        <span className='flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <GraduationCap className='size-7' aria-hidden='true' />
        </span>
        <div className='flex min-w-0 flex-col gap-1'>
          <Eyebrow tone='brand'>{t('railLabel')}</Eyebrow>
          <span className='truncate text-lg font-semibold tracking-tight text-ink-900'>
            {trimmedName || t('railPlaceholder')}
          </span>
        </div>
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
