'use client';

import { useTranslations } from 'next-intl';
import { CheckIcon, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROGRESS_STEPS, TERMINAL_STATUSES } from '@/modules/applications/constants/detail.constants';
import type { ProgressStep } from '@/modules/applications/types/detail.types';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export function ParentApplicationProgressBar({
  application,
}: {
  application: ParentApplication;
}) {
  const t = useTranslations('ParentApplications');
  const isTerminal = TERMINAL_STATUSES.includes(application.status);
  const steps = PROGRESS_STEPS as ProgressStep[];
  const currentStepIndex = steps.findIndex((s) => s.statuses.includes(application.status));

  if (isTerminal) {
    const message =
      application.status === 'withdrawn'
        ? t('progressTerminalWithdrawn')
        : t('progressTerminalDeclined');
    return (
      <div
        role='status'
        className='flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive'
      >
        <Ban className='h-4 w-4 shrink-0' aria-hidden='true' />
        {message}
      </div>
    );
  }

  return (
    <ol className='flex items-center gap-0' aria-label={t('progressBarLabel')}>
      {steps.map((step, idx) => {
        const isCompleted = currentStepIndex > idx;
        const isCurrent = currentStepIndex === idx;
        const isLast = idx === steps.length - 1;

        const circleClass = cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
          isCompleted
            ? 'bg-babu-500 text-on-primary'
            : isCurrent
              ? 'ring-2 ring-babu-500 ring-offset-1 bg-babu-500 text-on-primary'
              : 'bg-muted text-foggy',
        );

        return (
          <li
            key={step.key}
            className='flex flex-1 items-center last:flex-none'
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className='flex flex-col items-center gap-1'>
              <div
                className={circleClass}
                aria-label={t('progressStepAria', {
                  current: idx + 1,
                  total: steps.length,
                  label: t(step.label),
                })}
              >
                {isCompleted ? (
                  <CheckIcon className='h-3.5 w-3.5' aria-hidden='true' />
                ) : (
                  <span aria-hidden='true'>{idx + 1}</span>
                )}
              </div>
              <span className='whitespace-nowrap text-xs text-foggy'>{t(step.label)}</span>
            </div>
            {!isLast && (
              <div
                aria-hidden='true'
                className={cn('mb-4 h-0.5 flex-1', isCompleted ? 'bg-babu-500' : 'bg-border')}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
