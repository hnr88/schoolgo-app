'use client';

import { useTranslations } from 'next-intl';
import { Banknote, HandCoins, Hourglass, TrendingUp } from 'lucide-react';

import { StatTile } from '@/modules/core';
import { formatAud } from '@/modules/agent-commissions/lib/format-commissions';
import type { CommissionSummary } from '@/modules/agent-commissions/types/agent-commissions.types';

interface CommissionsSummaryTilesProps {
  summary: CommissionSummary;
}

export function CommissionsSummaryTiles({ summary }: CommissionsSummaryTilesProps) {
  const t = useTranslations('AgentCommissions');

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={TrendingUp}
        label={t('summaryExpected')}
        value={formatAud(summary.expectedAud)}
        subMetric={t('summaryExpectedHint')}
        iconClassName='text-vivid-iris'
      />
      <StatTile
        icon={Banknote}
        label={t('summaryAccrued')}
        value={formatAud(summary.accruedAud)}
        subMetric={t('summaryAccruedHint')}
        iconClassName='text-vivid-amber'
      />
      <StatTile
        icon={HandCoins}
        label={t('summaryReceived')}
        value={formatAud(summary.receivedAud)}
        subMetric={t('summaryReceivedHint')}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={Hourglass}
        label={t('summaryOutstanding')}
        value={formatAud(summary.outstandingAud)}
        subMetric={t('summaryOutstandingHint')}
        iconClassName='text-vivid-coral-strong'
      />
    </div>
  );
}
