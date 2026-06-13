'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/core';
import { FIT_STATUS_STYLES } from '@/modules/school-applicant-fit/constants/applicant-fit.constants';
import type { FitStatus } from '@/modules/school-applicant-fit/types/applicant-fit.types';

export function FitStatusBadge({ status }: { status: FitStatus }) {
  const t = useTranslations('SchoolApplicantFit');
  return <StatusBadge status={status} label={t(`status_${status}`)} styles={FIT_STATUS_STYLES} />;
}
