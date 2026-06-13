'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/core';
import { FIT_BAND_STYLES } from '@/modules/school-applicant-fit/constants/applicant-fit.constants';
import type { FitBand } from '@/modules/school-applicant-fit/types/applicant-fit.types';

export function FitBandBadge({ band }: { band: FitBand }) {
  const t = useTranslations('SchoolApplicantFit');
  return <StatusBadge status={band} label={t(`band_${band}`)} styles={FIT_BAND_STYLES} />;
}
