'use client';

import { useTranslations } from 'next-intl';
import { CalendarDays, CheckIcon, Clock, Hash, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatTile } from '@/modules/core';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { PROGRESS_STEPS, TERMINAL_STATUSES } from '@/modules/applications/constants/detail.constants';
import {
  daysToneFromCount,
  daysToneIconClass,
} from '@/modules/applications/lib/days-in-status';
import type { Application } from '@/modules/applications/types/application.types';
import type { ProgressStep } from '@/modules/applications/types/detail.types';

function ProgressBar({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const isTerminal = TERMINAL_STATUSES.includes(application.status);
  const currentStepIndex = (PROGRESS_STEPS as ProgressStep[]).findIndex((s) =>
    s.statuses.includes(application.status),
  );

  return (
    <div className='flex items-center gap-0'>
      {(PROGRESS_STEPS as ProgressStep[]).map((step, idx) => {
        const isCompleted = !isTerminal && currentStepIndex > idx;
        const isCurrent = !isTerminal && currentStepIndex === idx;
        const isLast = idx === PROGRESS_STEPS.length - 1;

        const circleClass = cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
          isTerminal && isCurrent
            ? 'bg-rausch-500 text-background'
            : isCompleted
              ? 'bg-babu-500 text-background'
              : isCurrent
                ? 'ring-2 ring-babu-500 ring-offset-1 bg-babu-500 text-background'
                : 'bg-muted text-foggy',
        );

        const lineClass = cn(
          'h-0.5 flex-1',
          isCompleted ? 'bg-babu-500' : 'bg-border',
        );

        return (
          <div key={step.key} className='flex flex-1 items-center last:flex-none'>
            <div className='flex flex-col items-center gap-1'>
              <div className={circleClass}>
                {isCompleted ? <CheckIcon className='h-3.5 w-3.5' /> : <span>{idx + 1}</span>}
              </div>
              <span className='whitespace-nowrap text-xs text-foggy'>{t(step.label)}</span>
            </div>
            {!isLast && <div className={cn(lineClass, 'mb-4')} />}
          </div>
        );
      })}
    </div>
  );
}

export function ApplicationDetailHeader({ application }: { application: Application }) {
  const t = useTranslations('Applications');
  const studentName = `${application.student?.firstName ?? '—'} ${application.student?.lastName ?? '—'}`;
  const submittedValue = application.submittedAt
    ? new Date(application.submittedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';
  const updatedValue = new Date(application.updatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  const daysTone = daysToneFromCount(application.daysInStatus);

  return (
    <div className='flex flex-col gap-5 rounded-xl border border-border bg-card p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl font-bold text-ink-900'>
            {t('studentToSchool', { student: studentName, school: application.school?.name ?? '—' })}
          </h1>
          {application.targetYearLevel && (
            <p className='text-sm text-foggy'>{application.targetYearLevel}{application.targetIntake ? ` · ${application.targetIntake}` : ''}</p>
          )}
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <ProgressBar application={application} />

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
        <StatTile icon={CalendarDays} label={t('submittedOn')} value={submittedValue} />
        <StatTile icon={RefreshCw} label={t('lastUpdated')} value={updatedValue} />
        <StatTile
          icon={Clock}
          iconClassName={daysToneIconClass(daysTone)}
          label={t('daysInCurrentStatus')}
          value={String(application.daysInStatus)}
        />
      </div>

      <p className='flex items-center gap-1.5 text-xs text-foggy'>
        <Hash className='h-3.5 w-3.5' aria-hidden='true' />
        <span>{t('applicationId')}</span>
        <span className='font-medium text-hof tabular-nums'>{application.documentId}</span>
      </p>
    </div>
  );
}
