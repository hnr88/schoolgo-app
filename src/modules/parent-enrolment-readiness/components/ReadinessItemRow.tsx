'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  READINESS_ITEM_LABEL_KEY,
  READINESS_STATUS_BADGE,
} from '@/modules/parent-enrolment-readiness/constants/enrolment-readiness.constants';
import type { ReadinessItem } from '@/modules/parent-enrolment-readiness/types/enrolment-readiness.types';

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function ReadinessItemRow({ item }: { item: ReadinessItem }) {
  const t = useTranslations('ParentEnrolmentReadiness');
  const tApplications = useTranslations('ParentApplications');

  const label =
    item.itemType === 'custom' && item.customLabel
      ? item.customLabel
      : tApplications(READINESS_ITEM_LABEL_KEY[item.itemType]);
  const submittedOn = formatDate(item.submittedAt);
  const reviewedOn = formatDate(item.reviewedAt);

  return (
    <div className='flex flex-col gap-1 border-b border-border/50 py-3 last:border-b-0'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm text-ink-900'>{label}</span>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold',
            READINESS_STATUS_BADGE[item.status],
          )}
        >
          {tApplications(`preEnrolmentStatus_${item.status}`)}
        </span>
      </div>
      {(submittedOn || reviewedOn) && (
        <div className='flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-foggy'>
          {submittedOn && <span>{t('submittedOn', { date: submittedOn })}</span>}
          {reviewedOn && <span>{t('reviewedOn', { date: reviewedOn })}</span>}
        </div>
      )}
      {item.note && <span className='text-xs text-foggy'>{item.note}</span>}
    </div>
  );
}
