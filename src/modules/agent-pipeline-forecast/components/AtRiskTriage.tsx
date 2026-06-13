'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TriangleAlert } from 'lucide-react';
import { EmptyState, StatusBadge } from '@/modules/core';
import {
  RISK_BADGE_STYLES,
  RISK_LABEL_KEY,
  resolveStatusLabelKey,
} from '@/modules/agent-pipeline-forecast/constants/agent-pipeline-forecast.constants';
import {
  formatProjectedDate,
  formatStudentName,
} from '@/modules/agent-pipeline-forecast/lib/format-forecast';
import type { ForecastItem } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface AtRiskTriageProps {
  items: ForecastItem[];
}

export function AtRiskTriage({ items }: AtRiskTriageProps) {
  const t = useTranslations('AgentForecast');
  const locale = useLocale();

  return (
    <section className='flex flex-col gap-4 rounded-xl border border-divider bg-card p-6 shadow-1'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-base font-semibold text-ink-900'>{t('triageTitle')}</h2>
        <p className='text-sm text-foggy'>{t('triageCaption')}</p>
      </div>
      {items.length === 0 ? (
        <EmptyState
          icon={TriangleAlert}
          title={t('triageEmptyTitle')}
          description={t('triageEmptyDescription')}
        />
      ) : (
        <ul className='flex flex-col gap-2'>
          {items.map((item) => (
            <li
              key={item.documentId}
              className='flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/40 px-4 py-3'
            >
              <div className='flex flex-col gap-0.5'>
                <span className='text-sm font-medium text-ink-900'>
                  {formatStudentName(item, t('unnamedStudent'))}
                </span>
                <span className='text-xs text-foggy'>
                  {item.school?.name ?? t('unnamedSchool')}
                  {item.nextStatus
                    ? ` · ${t('triageNext', { stage: t(resolveStatusLabelKey(item.nextStatus)) })}`
                    : ''}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-xs tabular-nums text-foggy'>
                  {formatProjectedDate(item.projectedNextStageAt, locale)}
                </span>
                <StatusBadge
                  status={item.risk}
                  label={t(RISK_LABEL_KEY[item.risk])}
                  styles={RISK_BADGE_STYLES}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
