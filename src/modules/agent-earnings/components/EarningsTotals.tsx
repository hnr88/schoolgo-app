'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, Clock, RotateCcw, XCircle } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { formatAud } from '@/modules/agent-payments';
import type { EarningsTotals as Totals } from '@/modules/agent-earnings/types/agent-earnings.types';

interface EarningsTotalsProps {
  totals: Totals;
}

export function EarningsTotals({ totals }: EarningsTotalsProps) {
  const t = useTranslations('AgentEarnings');

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={CheckCircle2}
        label={t('totalCompleted')}
        value={formatAud(totals.completedAud)}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={Clock}
        label={t('totalPending')}
        value={formatAud(totals.pendingAud)}
        iconClassName='text-vivid-amber'
      />
      <StatTile
        icon={RotateCcw}
        label={t('totalRefunded')}
        value={formatAud(totals.refundedAud)}
        iconClassName='text-foggy'
      />
      <StatTile
        icon={XCircle}
        label={t('failedCount')}
        value={totals.failedCount}
        iconClassName='text-vivid-coral'
      />
    </div>
  );
}
