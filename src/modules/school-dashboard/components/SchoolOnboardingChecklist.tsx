'use client';

import { Check, Circle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { SchoolOnboardingStepView } from '@/modules/school-dashboard/types/school-dashboard.types';

export function SchoolOnboardingChecklist({
  steps,
  completed,
}: {
  steps: SchoolOnboardingStepView[];
  completed: number;
}) {
  const t = useTranslations('SchoolDashboard');
  const total = steps.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className='flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-1'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-base font-bold text-ink-900'>{t('onboardingChecklistTitle')}</h2>
        <p className='text-sm text-foggy'>{t('onboardingDescription')}</p>
      </div>

      <div className='flex flex-col gap-2'>
        <Progress value={percent} aria-label={t('onboardingProgress', { done: completed, total })} />
        <span className='text-xs text-foggy'>
          {t('onboardingProgress', { done: completed, total })}
        </span>
      </div>

      <ul className='flex flex-col gap-2'>
        {steps.map((step) => (
          <li key={step.labelKey} className='flex items-center gap-3'>
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                step.done ? 'bg-babu-100 text-babu-700' : 'bg-muted text-foggy',
              )}
            >
              {step.done ? (
                <Check className='h-3.5 w-3.5' strokeWidth={2.5} />
              ) : (
                <Circle className='h-3 w-3' strokeWidth={2} />
              )}
            </span>
            <span
              className={cn(
                'text-sm',
                step.done ? 'text-foggy line-through' : 'text-ink-900',
              )}
            >
              {t(step.labelKey)}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href='/dashboard/profile'
        className='self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90'
      >
        {t('onboardingCta')}
      </Link>
    </section>
  );
}
