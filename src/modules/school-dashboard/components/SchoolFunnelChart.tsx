'use client';

import { useTranslations } from 'next-intl';
import { ArrowDown, Inbox, Gift, CheckCircle, GraduationCap } from 'lucide-react';
import { SectionHeading, SurfaceCard, StatTile } from '@/modules/core';
import { FUNNEL_STATUS_LABEL_KEY } from '@/modules/school-dashboard/constants/school-analytics.constants';
import { barWidth, formatRate } from '@/modules/school-dashboard/lib/school-analytics.lib';
import type {
  FunnelStage,
  FunnelConversionStep,
  FunnelTotals,
} from '@/modules/school-dashboard/types/school-analytics.types';

interface Props {
  stages: FunnelStage[];
  conversion: FunnelConversionStep[];
  totals: FunnelTotals;
}

export function SchoolFunnelChart({ stages, conversion, totals }: Props) {
  const t = useTranslations('SchoolAnalytics');
  const maxCount = stages.reduce((max, stage) => Math.max(max, stage.count), 0);
  const conversionByStage = new Map(conversion.map((step) => [step.from, step]));

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading title={t('funnelTitle')} description={t('funnelSubtitle')} level={2} />

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        <StatTile icon={Inbox} label={t('totalReceived')} value={totals.received} />
        <StatTile icon={Gift} label={t('totalOffered')} value={totals.offered} />
        <StatTile icon={CheckCircle} label={t('totalAccepted')} value={totals.accepted} />
        <StatTile icon={GraduationCap} label={t('totalEnrolled')} value={totals.enrolled} />
      </div>

      <SurfaceCard className='flex flex-col gap-3'>
        <ol className='flex flex-col gap-3'>
          {stages.map((stage) => {
            const step = conversionByStage.get(stage.status);
            return (
              <li key={stage.status} className='flex flex-col gap-1'>
                <div className='flex items-center justify-between gap-3'>
                  <span className='text-sm font-medium text-ink-900'>
                    {t(FUNNEL_STATUS_LABEL_KEY[stage.status])}
                  </span>
                  <span className='text-sm font-semibold tabular-nums text-ink-900'>{stage.count}</span>
                </div>
                <div
                  className='h-2 w-full overflow-hidden rounded-full bg-muted'
                  role='img'
                  aria-label={t('stageBarLabel', {
                    stage: t(FUNNEL_STATUS_LABEL_KEY[stage.status]),
                    count: stage.count,
                  })}
                >
                  <div
                    className='h-full rounded-full bg-primary-strong transition-[width] duration-500 ease-out-quart'
                    style={{ width: `${barWidth(stage.count, maxCount)}%` }}
                  />
                </div>
                {step ? (
                  <span className='inline-flex items-center gap-1 self-end text-xs font-medium tabular-nums text-foggy'>
                    <ArrowDown className='h-3 w-3' aria-hidden='true' />
                    {t('conversionLabel', { rate: formatRate(step.rate) })}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </SurfaceCard>
    </section>
  );
}
