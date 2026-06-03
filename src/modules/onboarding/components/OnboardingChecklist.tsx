'use client';

import { useTranslations } from 'next-intl';
import { Rocket, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ONBOARDING_STEPS } from '@/modules/onboarding/constants/onboarding.constants';
import { OnboardingStepRow } from '@/modules/onboarding/components/OnboardingStepRow';
import { useOnboardingStore } from '@/modules/onboarding/stores/use-onboarding-store';
import type { OnboardingProgress } from '@/modules/onboarding/types/onboarding.types';

interface OnboardingChecklistProps {
  progress: OnboardingProgress;
}

export function OnboardingChecklist({ progress }: OnboardingChecklistProps) {
  const t = useTranslations('Onboarding');
  const dismiss = useOnboardingStore((s) => s.dismiss);

  const doneByKey = new Map(progress.steps.map((step) => [step.key, step.done]));

  return (
    <section className='flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-1'>
      <div className='flex items-start gap-3 border-b border-divider px-5 py-4'>
        <span
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vivid-iris-soft text-vivid-iris'
          aria-hidden='true'
        >
          <Rocket className='h-4 w-4' />
        </span>
        <span className='flex min-w-0 flex-1 flex-col'>
          <span className='text-base font-bold text-ink-900'>{t('title')}</span>
          <span className='text-sm text-foggy'>{t('subtitle')}</span>
        </span>
        <Button
          size='icon'
          variant='ghost'
          onClick={dismiss}
          aria-label={t('dismiss')}
          className='shrink-0'
        >
          <X className='h-4 w-4' aria-hidden='true' />
        </Button>
      </div>

      <div className='flex flex-col gap-2 px-5 py-4'>
        <div className='flex items-center justify-between text-sm font-medium text-ink-900'>
          <span>
            {t('progressLabel', {
              completed: progress.completedCount,
              total: progress.total,
            })}
          </span>
          <span className='tabular-nums text-foggy'>{t('percent', { percent: progress.percent })}</span>
        </div>
        <Progress value={progress.percent} aria-label={t('title')} />
      </div>

      <ul className='flex flex-col divide-y divide-divider border-t border-divider'>
        {ONBOARDING_STEPS.map((step) => (
          <OnboardingStepRow key={step.key} step={step} done={doneByKey.get(step.key) ?? false} />
        ))}
      </ul>
    </section>
  );
}
