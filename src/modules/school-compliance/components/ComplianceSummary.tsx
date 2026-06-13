'use client';

import { useTranslations } from 'next-intl';
import { FileCheck2, AlertTriangle, CalendarClock, ShieldAlert } from 'lucide-react';
import { StatTile } from '@/modules/core';
import type {
  CoeRegisterResult,
  WatchlistResult,
} from '@/modules/school-compliance/types/school-compliance.types';

interface Props {
  register?: CoeRegisterResult;
  watchlist?: WatchlistResult;
}

export function ComplianceSummary({ register, watchlist }: Props) {
  const t = useTranslations('SchoolCompliance');
  const buckets = register?.bucketCounts ?? {};
  const flags = watchlist?.flagCounts;

  const expiringSoon = (buckets.expiring_0_30 ?? 0) + (buckets.expiring_31_60 ?? 0) + (buckets.expiring_61_90 ?? 0);

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      <StatTile icon={FileCheck2} label={t('statTotal')} value={register?.total ?? 0} iconClassName='text-vivid-mint' />
      <StatTile
        icon={CalendarClock}
        label={t('statExpiringSoon')}
        value={expiringSoon}
        iconClassName='text-vivid-amber-strong'
      />
      <StatTile
        icon={AlertTriangle}
        label={t('statExpired')}
        value={buckets.expired ?? 0}
        iconClassName='text-vivid-coral-strong'
      />
      <StatTile
        icon={ShieldAlert}
        label={t('statWatchlist')}
        value={watchlist?.total ?? 0}
        subMetric={flags ? t('statCaawPending', { count: flags.caawPending }) : undefined}
        iconClassName='text-vivid-coral-strong'
      />
    </div>
  );
}
