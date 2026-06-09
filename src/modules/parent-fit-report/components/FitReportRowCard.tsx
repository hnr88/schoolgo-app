'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SurfaceCard } from '@/modules/core';
import type {
  FitCheckTone,
  FitReportRowCardProps,
} from '@/modules/parent-fit-report/types/fit-report.types';

const TONE_STYLES: Record<FitCheckTone, string> = {
  pass: 'border-babu-200 bg-babu-50 text-babu-700',
  warn: 'border-arches-200 bg-arches-50 text-arches-700',
  fail: 'border-rausch-200 bg-rausch-50 text-rausch-700',
};

const TONE_ICONS = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
} as const;

export function FitReportRowCard({ row }: FitReportRowCardProps) {
  const t = useTranslations('ParentFitReport');
  const { school, status, result, checks } = row;

  return (
    <SurfaceCard className='flex flex-col gap-3'>
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0'>
          <p className='truncate font-semibold text-ink-900'>{school.name}</p>
          <p className='text-xs text-foggy'>
            {school.suburb}, {school.state}
          </p>
        </div>
        {status === 'success' && result && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
              result.eligible ? TONE_STYLES.pass : TONE_STYLES.fail,
            )}
          >
            {result.eligible ? (
              <CheckCircle2 className='h-3.5 w-3.5' aria-hidden='true' />
            ) : (
              <XCircle className='h-3.5 w-3.5' aria-hidden='true' />
            )}
            {result.eligible ? t('eligible') : t('notEligible')}
          </span>
        )}
      </div>

      {status === 'pending' && (
        <p className='flex items-center gap-2 text-sm text-foggy'>
          <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
          {t('checking')}
        </p>
      )}

      {status === 'error' && <p className='text-sm text-rausch-700'>{t('rowError')}</p>}

      {status === 'success' && result && (
        <div className='flex flex-col gap-2'>
          <div className='flex flex-wrap gap-2'>
            {checks.map((check) => {
              const Icon = TONE_ICONS[check.tone];
              return (
                <span
                  key={check.key}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs',
                    TONE_STYLES[check.tone],
                  )}
                >
                  <Icon className='h-3.5 w-3.5' aria-hidden='true' />
                  {check.key === 'age'
                    ? t('checkAge', {
                        age: result.ageCap.studentAge,
                        min: result.ageCap.minAge,
                        max: result.ageCap.maxAgeForLevel,
                      })
                    : t('checkCricos', {
                        status: result.cricos.status || t('cricosUnknown'),
                      })}
                </span>
              );
            })}
          </div>
          {result.hints.length > 0 && (
            <ul className='flex list-disc flex-col gap-1 pl-5 text-xs text-foggy'>
              {result.hints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </SurfaceCard>
  );
}
