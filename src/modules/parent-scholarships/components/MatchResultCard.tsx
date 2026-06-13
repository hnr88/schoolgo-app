'use client';

import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { SurfaceCard, StatusBadge } from '@/modules/core';
import { ELIGIBILITY_STYLES } from '@/modules/parent-scholarships/constants/scholarship-styles.constants';
import { SCHOLARSHIP_TYPE_LABEL_KEYS } from '@/modules/parent-scholarships/constants/scholarships.constants';
import {
  formatAward,
  splitReasons,
} from '@/modules/parent-scholarships/lib/format-scholarship';
import type { ScholarshipMatch } from '@/modules/parent-scholarships/types/scholarship.types';

export function MatchResultCard({ match }: { match: ScholarshipMatch }) {
  const t = useTranslations('ParentScholarships');
  const { scholarship, eligible } = match;
  const reasons = splitReasons(match.reason);
  const award = scholarship ? formatAward(scholarship.amountAud, scholarship.amountPct) : null;
  const typeLabelKey = scholarship
    ? SCHOLARSHIP_TYPE_LABEL_KEYS[scholarship.type as keyof typeof SCHOLARSHIP_TYPE_LABEL_KEYS]
    : undefined;

  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-3'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h4 className='text-sm font-semibold text-ink-900'>
            {scholarship?.name ?? t('awardUnspecified')}
          </h4>
          {award ? (
            <span className='text-sm text-foggy tabular-nums'>{award}</span>
          ) : null}
        </div>
        <StatusBadge
          status={eligible ? 'eligible' : 'ineligible'}
          label={eligible ? t('eligible') : t('notEligible')}
          styles={ELIGIBILITY_STYLES}
        />
      </div>

      {typeLabelKey ? (
        <span className='text-xs font-medium uppercase tracking-wide text-foggy'>
          {t(typeLabelKey)}
        </span>
      ) : null}

      <ul className='flex flex-col gap-1.5'>
        {reasons.map((reason, index) => (
          <li key={index} className='flex items-start gap-2 text-sm text-foreground'>
            {eligible ? (
              <Check className='mt-0.5 h-4 w-4 shrink-0 text-vivid-mint' aria-hidden='true' />
            ) : (
              <X
                className='mt-0.5 h-4 w-4 shrink-0 text-vivid-coral-strong'
                aria-hidden='true'
              />
            )}
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}
