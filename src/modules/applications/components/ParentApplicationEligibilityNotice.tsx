'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ParentApplicationEligibilityNoticeProps } from '@/modules/applications/types/parent-create-application.types';

export function ParentApplicationEligibilityNotice({
  fitCheck,
  isLoading,
}: ParentApplicationEligibilityNoticeProps) {
  const t = useTranslations('ParentApplications');

  if (isLoading) {
    return (
      <div className='flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-4 text-sm text-foggy'>
        <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
        {t('eligibilityChecking')}
      </div>
    );
  }

  if (!fitCheck) return null;

  const { ageCap, cricos } = fitCheck;
  const isCricosBlocked = !cricos.ok;
  const isAgeBlocked = !ageCap.ok;
  const isAgeWarning = ageCap.ok && ageCap.reason === 'age_year_mismatch';
  const tone = isCricosBlocked || isAgeBlocked ? 'blocker' : isAgeWarning ? 'warning' : 'eligible';

  const toneStyles = {
    blocker: 'border-rausch-200 bg-rausch-50 text-rausch-700',
    warning: 'border-arches-200 bg-arches-50 text-arches-700',
    eligible: 'border-babu-200 bg-babu-50 text-babu-700',
  } as const;

  const ToneIcon = tone === 'blocker' ? XCircle : tone === 'warning' ? AlertTriangle : CheckCircle2;
  const headingKey =
    tone === 'blocker'
      ? 'eligibilityBlockedTitle'
      : tone === 'warning'
        ? 'eligibilityWarningTitle'
        : 'eligibilityOkTitle';

  return (
    <div
      role={tone === 'blocker' ? 'alert' : 'status'}
      className={cn('flex flex-col gap-2 rounded-lg border p-4 text-sm', toneStyles[tone])}
    >
      <span className='flex items-center gap-2 font-semibold'>
        <ToneIcon className='h-4 w-4 shrink-0' aria-hidden='true' />
        {t(headingKey)}
      </span>
      <ul className='flex list-disc flex-col gap-1 pl-5'>
        {isAgeBlocked ? (
          <li>{t('eligibilityAgeBlocked', { age: ageCap.studentAge, cap: ageCap.maxAgeForLevel, min: ageCap.minAge })}</li>
        ) : isAgeWarning ? (
          <li>{t('eligibilityAgeWarning', { age: ageCap.studentAge })}</li>
        ) : (
          <li>{t('eligibilityAgeOk', { age: ageCap.studentAge })}</li>
        )}
        {isCricosBlocked ? (
          <li>{t('eligibilityCricosBlocked', { status: cricos.status || t('eligibilityCricosUnknown') })}</li>
        ) : (
          <li>{t('eligibilityCricosOk')}</li>
        )}
      </ul>
    </div>
  );
}
