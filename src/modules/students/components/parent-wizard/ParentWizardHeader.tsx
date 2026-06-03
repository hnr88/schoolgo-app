'use client';

import { useTranslations } from 'next-intl';
import { WizardProgress } from '@/modules/forms';
import type { WizardChromeState } from '@/modules/forms';

export function ParentWizardHeader(chrome: WizardChromeState) {
  const { stepIndex, stepCount } = chrome;
  const t = useTranslations('StudentWizard');
  const progress = Math.round(((stepIndex + 1) / stepCount) * 100);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs font-semibold uppercase tracking-wide text-primary'>
            {t('stepCounter', { current: stepIndex + 1, total: stepCount })}
          </span>
          <span className='text-xs font-medium text-muted-foreground'>
            {t('stepProgress', { percent: progress })}
          </span>
        </div>
        <div
          className='h-1.5 w-full overflow-hidden rounded-full bg-muted'
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className='h-full origin-left rounded-full bg-primary transition-transform duration-500 ease-out-quart'
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
      <div className='lg:hidden'>
        <WizardProgress
          steps={chrome.steps}
          activeIndex={stepIndex}
          onStepSelect={chrome.goTo}
          backLabel={chrome.backLabel}
        />
      </div>
    </div>
  );
}
