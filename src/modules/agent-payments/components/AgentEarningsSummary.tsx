'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock, CheckCircle2, Clock, Receipt } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { formatAud } from '@/modules/agent-payments/lib/format-payment';
import type { AgentEarningsSummary as Summary } from '@/modules/agent-payments/types/agent-payment.types';

interface AgentEarningsSummaryProps {
  summary: Summary;
}

export function AgentEarningsSummary({ summary }: AgentEarningsSummaryProps) {
  const t = useTranslations('AgentPayments');

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={CheckCircle2}
        label={t('summaryCompleted')}
        value={formatAud(summary.totalCompleted)}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={CalendarClock}
        label={t('summaryThisMonth')}
        value={formatAud(summary.thisMonthCompleted)}
        iconClassName='text-vivid-iris'
      />
      <StatTile
        icon={Clock}
        label={t('summaryPending')}
        value={formatAud(summary.totalPending)}
        iconClassName='text-vivid-amber'
      />
      <StatTile
        icon={Receipt}
        label={t('summaryCount')}
        value={summary.count}
        iconClassName='text-vivid-coral'
      />
    </div>
  );
}
