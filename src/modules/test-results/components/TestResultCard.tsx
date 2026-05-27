'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, Hash } from 'lucide-react';
import { StatusBadge } from '@/modules/core';
import {
  TEST_TYPE_LABELS,
  VERIFICATION_STATUS_LABELS,
  VERIFICATION_STATUS_STYLES,
} from '@/modules/test-results/constants/test-results.constants';
import { formatTestDate, toSubScoreEntries } from '@/modules/test-results/lib/sub-scores';
import type { TestResultCardProps } from '@/modules/test-results/types/component.types';

export function TestResultCard({ result }: TestResultCardProps) {
  const t = useTranslations('ParentTestResults');
  const locale = useLocale();

  const subScores = toSubScoreEntries(result.subScores);
  const formattedDate = formatTestDate(result.testDate, locale);

  return (
    <article className='flex flex-col gap-4 rounded-xl border border-border bg-card p-5'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {t(TEST_TYPE_LABELS[result.testType])}
          </p>
          <p className='font-display text-2xl font-bold text-ink-900'>{result.overallScore}</p>
        </div>
        <StatusBadge
          status={result.verificationStatus}
          label={t(VERIFICATION_STATUS_LABELS[result.verificationStatus])}
          styles={VERIFICATION_STATUS_STYLES}
        />
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground'>
        {formattedDate && (
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDays className='h-4 w-4' aria-hidden='true' />
            {formattedDate}
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
                <dd className='text-sm font-semibold text-foreground'>{entry.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {result.notes && (
        <p className='border-t border-border pt-4 text-sm text-muted-foreground'>{result.notes}</p>
      )}
    </article>
  );
}
