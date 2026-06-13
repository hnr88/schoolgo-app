import type { LikelihoodBand } from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

export const MAX_ADMISSION_LIKELIHOOD_SCHOOLS = 25;

export const ADMISSION_LIKELIHOOD_BANDS = ['reach', 'match', 'safety'] as const;

export const BAND_LABEL_KEYS: Record<LikelihoodBand, string> = {
  reach: 'band_reach',
  match: 'band_match',
  safety: 'band_safety',
};

export const COMPETITION_LABEL_KEYS: Record<string, string> = {
  low: 'competition_low',
  moderate: 'competition_moderate',
  high: 'competition_high',
  unknown: 'competition_unknown',
};

export const FACTOR_LABEL_KEYS: Record<string, string> = {
  cricosStatus: 'factor_cricosStatus',
  cricosAge: 'factor_cricosAge',
  schoolCricosAgeWindow: 'factor_schoolCricosAgeWindow',
  englishScore: 'factor_englishScore',
  capacity: 'factor_capacity',
  enrolmentStatus: 'factor_enrolmentStatus',
  partnerAgentsOnly: 'factor_partnerAgentsOnly',
};
