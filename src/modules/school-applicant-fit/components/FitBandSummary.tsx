'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Target, TrendingUp } from 'lucide-react';
import { StatTile } from '@/modules/core';
import { countByBand } from '@/modules/school-applicant-fit/lib/format-fit';
import type {
  ApplicantFitRow,
  FitBand,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

const BAND_ICON: Record<FitBand, typeof ShieldCheck> = {
  safety: ShieldCheck,
  match: Target,
  reach: TrendingUp,
};

const BAND_ICON_TINT: Record<FitBand, string> = {
  safety: 'text-vivid-mint',
  match: 'text-primary-strong',
  reach: 'text-vivid-coral-strong',
};

const BANDS: readonly FitBand[] = ['safety', 'match', 'reach'];

export function FitBandSummary({ rows, total }: { rows: ApplicantFitRow[]; total: number }) {
  const t = useTranslations('SchoolApplicantFit');
  const counts = countByBand(rows);

  return (
    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      <StatTile icon={Target} label={t('summaryTotal')} value={total} />
      {BANDS.map((band) => (
        <StatTile
          key={band}
          icon={BAND_ICON[band]}
          iconClassName={BAND_ICON_TINT[band]}
          label={t(`band_${band}`)}
          value={counts[band]}
          subMetric={t('summaryPageSub')}
        />
      ))}
    </div>
  );
}
