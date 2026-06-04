'use client';

import { useTranslations } from 'next-intl';
import { Rocket, X } from 'lucide-react';
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
  const activeKey = ONBOARDING_STEPS.find((step) => !doneByKey.get(step.key))?.key;

  return (
    <section className='overflow-hidden rounded-3xl border border-gray-100 bg-card shadow-2'>
      <div className='relative overflow-hidden border-b border-rausch-100 bg-primary-light p-6 md:p-7'>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-rausch-100/70'
        />
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rotate-12 rounded-3xl bg-rausch-100/50'
        />

        <button
          type='button'
          onClick={dismiss}
          aria-label={t('dismiss')}
          className='absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-foggy transition-colors hover:bg-rausch-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        >
          <X className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
        </button>

        <div className='relative flex items-center gap-3 pr-8'>
          <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground'>
            <Rocket className='h-5 w-5' strokeWidth={2} aria-hidden='true' />
          </span>
          <div className='min-w-0 flex-1'>
            <h2 className='font-display text-xl font-bold tracking-tight text-ink-900'>
              {t('title')}
            </h2>
            <p className='truncate text-sm text-foggy'>{t('subtitle')}</p>
          </div>
        </div>

        <div className='relative mt-5'>
          <div className='mb-2 flex items-center justify-between text-sm font-semibold text-ink-900'>
            <span>
              {t('progressLabel', {
                completed: progress.completedCount,
                total: progress.total,
              })}
            </span>
            <span className='tabular-nums text-foggy'>
              {t('percent', { percent: progress.percent })}
            </span>
          </div>
          <div className='h-2 overflow-hidden rounded-full bg-rausch-100'>
            <div
              className='h-full rounded-full bg-primary'
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      </div>

      <ul className='flex flex-col divide-y divide-divider'>
        {ONBOARDING_STEPS.map((step) => (
          <OnboardingStepRow
            key={step.key}
            step={step}
            done={doneByKey.get(step.key) ?? false}
            isActive={step.key === activeKey}
          />
        ))}
      </ul>
    </section>
  );
}
