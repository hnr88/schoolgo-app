'use client';

import { useFormatter, useTranslations } from 'next-intl';

import { StatusBadge, SurfaceCard } from '@/modules/core';
import {
  CERT_STATUS_BADGE_STYLES,
  resolveCertStatusLabelKey,
} from '@/modules/agent-training/constants/agent-training.constants';
import type { Certification } from '@/modules/agent-training/types/agent-training.types';

export function CertificationRow({ certification }: { certification: Certification }) {
  const t = useTranslations('AgentTraining');
  const format = useFormatter();
  const { course, status, score, issuedAt, expiresAt } = certification;

  return (
    <SurfaceCard padding='sm' className='flex flex-wrap items-center justify-between gap-3'>
      <div className='flex flex-col gap-1'>
        <span className='text-sm font-semibold text-ink-900'>
          {course?.title ?? t('certUnknownCourse')}
        </span>
        <span className='text-xs text-foggy'>
          {issuedAt
            ? t('certIssuedOn', { date: format.dateTime(new Date(issuedAt), { dateStyle: 'medium' }) })
            : t('certNotIssued')}
          {expiresAt
            ? ` · ${t('certExpiresOn', { date: format.dateTime(new Date(expiresAt), { dateStyle: 'medium' }) })}`
            : ''}
        </span>
      </div>
      <div className='flex items-center gap-3'>
        {typeof score === 'number' ? (
          <span className='text-sm font-semibold tabular-nums text-ink-900'>
            {t('certScore', { score })}
          </span>
        ) : null}
        <StatusBadge
          status={status}
          label={t(resolveCertStatusLabelKey(status))}
          styles={CERT_STATUS_BADGE_STYLES}
        />
      </div>
    </SurfaceCard>
  );
}
