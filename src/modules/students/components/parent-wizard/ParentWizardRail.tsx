'use client';

import { useTranslations } from 'next-intl';
import { WizardProgress } from '@/modules/forms';
import type { WizardChromeState } from '@/modules/forms';
import { Eyebrow } from '@/modules/design-system';
import { getInitials } from '@/modules/students/lib/get-initials';

interface ParentWizardRailProps {
  chrome: WizardChromeState;
  studentName: string;
}

export function ParentWizardRail({ chrome, studentName }: ParentWizardRailProps) {
  const t = useTranslations('StudentWizard');
  const trimmedName = studentName.trim();
  const [first = '', last = ''] = trimmedName.split(/\s+/);
  const initials = getInitials(first, last);

  return (
    <div className='flex flex-col gap-8 lg:sticky lg:top-8'>
      <div className='flex items-center gap-4 rounded-xl border border-gray-100 bg-card p-5 shadow-1'>
        {initials && (
          <span className='flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground'>
            {initials}
          </span>
        )}
        <div className='flex min-w-0 flex-col gap-0.5'>
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
