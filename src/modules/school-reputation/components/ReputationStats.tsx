'use client';

import { useTranslations } from 'next-intl';
import { MessagesSquare, Star, MailWarning, Gauge } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { scoreDelta } from '@/modules/school-reputation/lib/school-reputation';
import type {
  Benchmark,
  ReputationAggregate,
} from '@/modules/school-reputation/types/school-reputation.types';

interface ReputationStatsProps {
  aggregate: ReputationAggregate;
  unansweredCount: number;
  benchmark: Benchmark | null;
}

export function ReputationStats({ aggregate, unansweredCount, benchmark }: ReputationStatsProps) {
  const t = useTranslations('SchoolReputation');
  const dash = t('noScore');

  const sectorDelta = benchmark
    ? scoreDelta(benchmark.own.avgRating, benchmark.sector.avgRating)
    : null;
  const deltaLabel = sectorDelta === null ? dash : `${sectorDelta > 0 ? '+' : ''}${sectorDelta.toFixed(1)}`;

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={Star}
        iconClassName='text-rausch-500'
        label={t('statOverall')}
        value={typeof aggregate.avgRating === 'number' ? aggregate.avgRating.toFixed(1) : dash}
        subMetric={t('statOutOfFive')}
      />
      <StatTile
        icon={MessagesSquare}
        label={t('statTotalReviews')}
        value={aggregate.count}
      />
      <StatTile
        icon={MailWarning}
        iconClassName='text-vivid-coral-strong'
        label={t('statUnanswered')}
        value={unansweredCount}
      />
      <StatTile
        icon={Gauge}
        label={t('statVsSector')}
        value={deltaLabel}
        subMetric={t('statVsSectorHint')}
      />
    </div>
  );
}
