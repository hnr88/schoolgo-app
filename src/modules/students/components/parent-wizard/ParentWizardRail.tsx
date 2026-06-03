'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { WizardProgress } from '@/modules/forms';
import type { WizardChromeState } from '@/modules/forms';

interface ParentWizardRailProps {
  chrome: WizardChromeState;
  studentName: string;
}

export function ParentWizardRail({ chrome, studentName }: ParentWizardRailProps) {
  const t = useTranslations('StudentWizard');

  return (
    <div className='flex flex-col gap-6 lg:sticky lg:top-6'>
      <div className='flex items-start gap-3'>
        <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <GraduationCap className='size-5' aria-hidden='true' />
        </span>
        <div className='flex min-w-0 flex-col gap-0.5'>
          <span className='text-xs font-medium text-muted-foreground'>{t('railLabel')}</span>
          <span className='truncate text-sm font-semibold text-ink-900'>
            {studentName.trim() || t('railPlaceholder')}
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
