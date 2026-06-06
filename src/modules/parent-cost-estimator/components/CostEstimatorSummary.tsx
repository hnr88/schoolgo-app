'use client';

import { useTranslations } from 'next-intl';
import { Coins, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { formatAud } from '@/modules/parent-cost-estimator/lib/format-aud';
import type { CostEstimatorSummary as Summary } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

interface CostEstimatorSummaryProps {
  summary: Summary;
  years: number;
}

export function CostEstimatorSummary({ summary, years }: CostEstimatorSummaryProps) {
  const t = useTranslations('ParentCostEstimator');
  const dash = '—';
  const subtitle = t('overYears', { count: years });

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={PiggyBank}
        label={t('summaryCheapest')}
        value={summary.cheapestTotal === null ? dash : formatAud(summary.cheapestTotal)}
        subMetric={subtitle}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={Coins}
        label={t('summaryAverage')}
        value={summary.averageTotal === null ? dash : formatAud(summary.averageTotal)}
        subMetric={subtitle}
        iconClassName='text-vivid-iris'
      />
      <StatTile
        icon={TrendingUp}
        label={t('summaryDearest')}
        value={summary.dearestTotal === null ? dash : formatAud(summary.dearestTotal)}
        subMetric={subtitle}
        iconClassName='text-vivid-coral'
      />
      <StatTile
        icon={Wallet}
        label={t('summaryPriced')}
        value={summary.pricedCount}
        subMetric={t('unpricedCount', { count: summary.unpricedCount })}
        iconClassName='text-vivid-amber'
      />
    </div>
  );
}
