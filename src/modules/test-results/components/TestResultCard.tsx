'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { CalendarDays, Hash } from 'lucide-react';
import { StatusBadge, SurfaceCard } from '@/modules/core';
import {
  TEST_TYPE_LABELS,
  VERIFICATION_STATUS_LABELS,
  VERIFICATION_STATUS_STYLES,
} from '@/modules/test-results/constants/test-results.constants';
import { VerifyingBadge } from '@/modules/test-results/components/VerifyingBadge';
import { parseTestDate, toSubScoreEntries } from '@/modules/test-results/lib/sub-scores';
import type { TestResultCardProps } from '@/modules/test-results/types/component.types';

export function TestResultCard({ result }: TestResultCardProps) {
  const t = useTranslations('ParentTestResults');
  const format = useFormatter();

  const subScores = toSubScoreEntries(result.subScores);
  const testDate = parseTestDate(result.testDate);
  const isVerifying = result.verificationStatus === 'verifying';

  return (
    <SurfaceCard elevation='interactive' padding='md' className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-center justify-center rounded-lg border border-rausch-200 bg-rausch-50 px-4 py-3'>
            <span className='font-display text-3xl font-bold tabular-nums text-primary-strong'>
              {result.overallScore}
            </span>
          </div>
          <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t(TEST_TYPE_LABELS[result.testType])}
          </p>
        </div>
        {isVerifying ? (
          <VerifyingBadge label={t(VERIFICATION_STATUS_LABELS.verifying)} />
        ) : (
          <StatusBadge
            status={result.verificationStatus}
            label={t(VERIFICATION_STATUS_LABELS[result.verificationStatus])}
            styles={VERIFICATION_STATUS_STYLES}
          />
        )}
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground'>
        {testDate && (
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDays className='h-4 w-4' aria-hidden='true' />
            {format.dateTime(testDate, { dateStyle: 'medium' })}
          </span>
        )}
        {result.candidateNumber && (
          <span className='inline-flex items-center gap-1.5'>
            <Hash className='h-4 w-4' aria-hidden='true' />
            {result.candidateNumber}
          </span>
        )}
      </div>

      {subScores.length > 0 && (
        <div className='flex flex-col gap-2 border-t border-border pt-4'>
          <p className='text-xs font-medium text-foreground'>{t('subScoresTitle')}</p>
          <dl className='grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3'>
            {subScores.map((entry) => (
              <div key={entry.label} className='flex flex-col gap-0.5'>
                <dt className='text-xs text-muted-foreground'>{entry.label}</dt>
                <dd className='text-sm font-semibold tabular-nums text-ink-900'>{entry.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {result.notes && (
        <div className='flex flex-col gap-1 border-t border-border pt-4'>
          <p className='text-xs font-medium text-foreground'>{t('notesLabel')}</p>
          <p className='text-sm text-muted-foreground'>{result.notes}</p>
        </div>
      )}
    </SurfaceCard>
  );
}
