'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  CalendarClock,
  FileCheck2,
  Files,
  Gift,
  GraduationCap,
  Handshake,
  Percent,
  ThumbsUp,
} from 'lucide-react';
import { StatTile } from '@/modules/core';
import {
  formatAvgDays,
  formatRate,
} from '@/modules/school-agent-performance/lib/format-performance';
import type { AgentPerformanceTotals } from '@/modules/school-agent-performance/types/agent-performance.types';

interface PerformanceTotalsProps {
  totals: AgentPerformanceTotals;
}

export function PerformanceTotals({ totals }: PerformanceTotalsProps) {
  const t = useTranslations('SchoolAgentPerformance');
  const locale = useLocale();

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile
        icon={Files}
        label={t('totalApplications')}
        value={totals.applications}
        iconClassName='text-foggy'
      />
      <StatTile
        icon={FileCheck2}
        label={t('totalSubmitted')}
        value={totals.submitted}
        iconClassName='text-vivid-iris'
      />
      <StatTile
        icon={Gift}
        label={t('totalOffers')}
        value={totals.offers}
        iconClassName='text-vivid-amber'
      />
      <StatTile
        icon={ThumbsUp}
        label={t('totalAccepted')}
        value={totals.accepted}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={GraduationCap}
        label={t('totalEnrolled')}
        value={totals.enrolled}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={Percent}
        label={t('totalOfferRate')}
        value={formatRate(totals.offerRate, locale)}
        iconClassName='text-vivid-iris-strong'
      />
      <StatTile
        icon={Handshake}
        label={t('totalAcceptanceRate')}
        value={formatRate(totals.acceptanceRate, locale)}
        iconClassName='text-vivid-iris-strong'
      />
      <StatTile
        icon={CalendarClock}
        label={t('totalAvgDays')}
        value={formatAvgDays(totals.avgDaysToOffer, locale)}
        iconClassName='text-foggy'
      />
    </div>
  );
}
