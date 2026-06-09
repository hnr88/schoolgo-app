'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarClock, FileCheck2, Gift, GraduationCap, Percent } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { formatAvgDays, formatOfferRate } from '@/modules/agent-analytics/lib/format-analytics';
import type { AnalyticsTotals as Totals } from '@/modules/agent-analytics/types/agent-analytics.types';

interface AnalyticsTotalsProps {
  totals: Totals;
}

export function AnalyticsTotals({ totals }: AnalyticsTotalsProps) {
  const t = useTranslations('AgentAnalytics');
  const locale = useLocale();

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-5'>
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
        icon={GraduationCap}
        label={t('totalEnrolled')}
        value={totals.enrolled}
        iconClassName='text-vivid-mint'
      />
      <StatTile
        icon={Percent}
        label={t('totalOfferRate')}
        value={formatOfferRate(totals.offerRate, locale)}
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
