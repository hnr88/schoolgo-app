'use client';

import { useTranslations } from 'next-intl';
import { CalendarCheck, CircleAlert, Eye, ListChecks } from 'lucide-react';
import { StatTile } from '@/modules/core';
import type { ForecastCounts } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface ForecastSummaryProps {
  counts: ForecastCounts;
  totalActive: number;
}

export function ForecastSummary({ counts, totalActive }: ForecastSummaryProps) {
  const t = useTranslations('AgentForecast');

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={ListChecks}
        label={t('totalActive')}
        value={totalActive}
        iconClassName='text-foggy'
      />
      <StatTile
        icon={CircleAlert}
        label={t('totalOverdue')}
        value={counts.overdue}
        iconClassName='text-rausch-500'
      />
      <StatTile
        icon={Eye}
        label={t('totalWatch')}
        value={counts.watch}
        iconClassName='text-vivid-amber'
      />
      <StatTile
        icon={CalendarCheck}
        label={t('totalOnTrack')}
        value={counts.onTrack}
        iconClassName='text-vivid-mint'
      />
    </div>
  );
}
