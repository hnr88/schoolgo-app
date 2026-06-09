'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, CalendarClock, CircleCheck, FileX } from 'lucide-react';
import { StatTile } from '@/modules/core';
import type { ComplianceSummaryHeaderProps } from '@/modules/agent-compliance/types/agent-compliance.types';

export function ComplianceSummaryHeader({ summary }: ComplianceSummaryHeaderProps) {
  const t = useTranslations('AgentCompliance');

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      <StatTile
        icon={AlertTriangle}
        iconClassName='text-vivid-coral-strong'
        label={t('summaryExpired')}
        value={summary.expired}
      />
      <StatTile
        icon={CalendarClock}
        iconClassName='text-vivid-amber'
        label={t('summaryExpiring')}
        value={summary.expiring}
      />
      <StatTile
        icon={FileX}
        label={t('summaryMissing')}
        value={summary.missing}
      />
      <StatTile
        icon={CircleCheck}
        iconClassName='text-vivid-mint'
        label={t('summaryOk')}
        value={summary.ok}
      />
    </div>
  );
}
