import type {
  FitBand,
  FitCriterion,
  FitStatus,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

export const APPLICANT_FIT_PAGE_SIZE = 25;

export const FIT_CRITERIA: readonly FitCriterion[] = [
  'age',
  'english',
  'gender',
  'documents',
  'quality',
  'curriculum',
  'capacity',
];

export const FIT_BANDS: readonly FitBand[] = ['safety', 'match', 'reach'];

export const THRESHOLD_KEYS = ['reach', 'match', 'safety'] as const;

// StatusBadge style maps (dot / bg / text) for the band pill and the
// per-criterion fit status — colour tokens only, no copy.
export const FIT_BAND_STYLES: Record<FitBand, { dot: string; bg: string; text: string }> = {
  safety: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  match: { dot: 'bg-rausch-400', bg: 'bg-rausch-50', text: 'text-primary-strong' },
  reach: { dot: 'bg-vivid-coral-strong', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};

export const FIT_STATUS_STYLES: Record<FitStatus, { dot: string; bg: string; text: string }> = {
  met: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  warning: { dot: 'bg-rausch-400', bg: 'bg-rausch-50', text: 'text-primary-strong' },
  blocker: { dot: 'bg-vivid-coral-strong', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  unknown: { dot: 'bg-foggy', bg: 'bg-muted', text: 'text-foggy' },
};
