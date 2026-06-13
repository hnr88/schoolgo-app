'use client';

import { useTranslations } from 'next-intl';
import { Building2, CalendarClock, ExternalLink } from 'lucide-react';
import { SurfaceCard, StatusBadge } from '@/modules/core';
import { SCHOLARSHIP_TYPE_LABEL_KEYS } from '@/modules/parent-scholarships/constants/scholarships.constants';
import { SCHOLARSHIP_TYPE_STYLES } from '@/modules/parent-scholarships/constants/scholarship-styles.constants';
import {
  formatAward,
  formatDeadline,
} from '@/modules/parent-scholarships/lib/format-scholarship';
import type { Scholarship } from '@/modules/parent-scholarships/types/scholarship.types';

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const t = useTranslations('ParentScholarships');
  const award = formatAward(scholarship.amountAud, scholarship.amountPct);
  const deadline = formatDeadline(scholarship.deadline);
  const typeLabelKey = SCHOLARSHIP_TYPE_LABEL_KEYS[scholarship.type as keyof typeof SCHOLARSHIP_TYPE_LABEL_KEYS];

  return (
    <SurfaceCard elevation='interactive' className='flex h-full flex-col gap-3'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='font-display text-base font-semibold text-ink-900'>{scholarship.name}</h3>
        <StatusBadge
          status={scholarship.type}
          label={typeLabelKey ? t(typeLabelKey) : scholarship.type}
          styles={SCHOLARSHIP_TYPE_STYLES}
        />
      </div>

      <p className='font-display text-2xl font-bold tracking-tight text-ink-900 tabular-nums'>
        {award ?? t('awardUnspecified')}
      </p>

      <dl className='flex flex-col gap-1.5 text-sm text-foggy'>
        {scholarship.school ? (
          <div className='flex items-center gap-2'>
            <Building2 className='h-4 w-4 shrink-0' aria-hidden='true' />
            <dd>{scholarship.school.name}</dd>
          </div>
        ) : null}
        <div className='flex items-center gap-2'>
          <CalendarClock className='h-4 w-4 shrink-0' aria-hidden='true' />
          <dd>{deadline ? t('deadlineValue', { date: deadline }) : t('deadlineOpen')}</dd>
        </div>
      </dl>

      {scholarship.externalUrl ? (
        <a
          href={scholarship.externalUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary-strong hover:underline'
        >
          {t('learnMore')}
          <ExternalLink className='h-3.5 w-3.5' aria-hidden='true' />
        </a>
      ) : null}
    </SurfaceCard>
  );
}
