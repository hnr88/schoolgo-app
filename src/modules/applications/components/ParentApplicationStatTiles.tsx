'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarClock, CalendarDays, Clock, Coins, RefreshCw } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { formatDate, formatOfferFee } from '@/modules/applications/lib/parent-format';
import {
  daysToneIconClass,
  parseDaysTone,
} from '@/modules/applications/lib/days-in-status';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export function ParentApplicationStatTiles({
  application,
}: {
  application: ParentApplication;
}) {
  const t = useTranslations('ParentApplications');
  const locale = useLocale();

  const tone = parseDaysTone(application.daysInStatusColor);
  const isUrgent = tone !== 'grey';
  const daysSubMetric = isUrgent
    ? t('daysInStatusToneUrgent', { days: application.daysInStatus })
    : t('daysInStatusTone', { days: application.daysInStatus });

  const hasOffer = application.offerAnnualFee != null || application.offerDeadline != null;
  const offerFee = formatOfferFee(application.offerAnnualFee, locale);
  const offerDeadline = formatDate(application.offerDeadline, locale);

  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
      <StatTile
        icon={CalendarDays}
        label={t('submittedOn')}
        value={formatDate(application.submittedAt, locale) ?? '—'}
      />
      <StatTile
        icon={RefreshCw}
        label={t('lastUpdated')}
        value={formatDate(application.updatedAt, locale) ?? '—'}
      />
      <StatTile
        icon={Clock}
        iconClassName={daysToneIconClass(tone)}
        label={t('statTileDaysInStatus')}
        value={String(application.daysInStatus)}
        subMetric={daysSubMetric}
      />
      {hasOffer && (
        <>
          <StatTile
            icon={Coins}
            label={t('statTileFee')}
            value={offerFee ?? '—'}
          />
          <StatTile
            icon={CalendarClock}
            label={t('statTileDeadline')}
            value={offerDeadline ?? '—'}
          />
        </>
      )}
    </div>
  );
}
