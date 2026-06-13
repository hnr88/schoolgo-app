import type { CoeLifecycleState, ExpiryBucket, ComplianceEventType } from '@/modules/school-compliance/types/school-compliance.types';

type BadgeStyle = { dot: string; bg: string; text: string };

export const LIFECYCLE_LABEL_KEY: Record<CoeLifecycleState, string> = {
  not_issued: 'lifecycleNotIssued',
  missing: 'lifecycleMissing',
  issued: 'lifecycleIssued',
  started: 'lifecycleStarted',
  expiring_soon: 'lifecycleExpiringSoon',
  expired: 'lifecycleExpired',
  unknown: 'lifecycleUnknown',
};

export const LIFECYCLE_STYLES: Record<string, BadgeStyle> = {
  not_issued: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  missing: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  issued: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  started: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  expiring_soon: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber-strong' },
  expired: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  unknown: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
};

export const BUCKET_LABEL_KEY: Record<ExpiryBucket, string> = {
  expired: 'bucketExpired',
  expiring_0_30: 'bucketExpiring030',
  expiring_31_60: 'bucketExpiring3160',
  expiring_61_90: 'bucketExpiring6190',
  ok: 'bucketOk',
  unknown: 'bucketUnknown',
};

export const BUCKET_STYLES: Record<string, BadgeStyle> = {
  expired: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  expiring_0_30: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  expiring_31_60: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber-strong' },
  expiring_61_90: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber-strong' },
  ok: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  unknown: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
};

export const PASSPORT_STATUS_LABEL_KEY: Record<string, string> = {
  ok: 'passportOk',
  expiring: 'passportExpiring',
  expired: 'passportExpired',
  unknown: 'passportUnknown',
};

export const PASSPORT_STATUS_STYLES: Record<string, BadgeStyle> = {
  ok: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  expiring: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber-strong' },
  expired: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  unknown: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
};

export const EVENT_TYPE_OPTIONS: { value: ComplianceEventType; labelKey: string }[] = [
  { value: 'issued', labelKey: 'eventTypeIssued' },
  { value: 'started', labelKey: 'eventTypeStarted' },
  { value: 'expiring_soon', labelKey: 'eventTypeExpiringSoon' },
  { value: 'expired', labelKey: 'eventTypeExpired' },
  { value: 'caaw_issued', labelKey: 'eventTypeCaawIssued' },
  { value: 'breach_flagged', labelKey: 'eventTypeBreachFlagged' },
];

export const WATCHLIST_FLAG_KEYS: { key: keyof import('@/modules/school-compliance/types/school-compliance.types').WatchlistFlagCounts; labelKey: string }[] = [
  { key: 'coeExpiringSoon', labelKey: 'flagCoeExpiringSoon' },
  { key: 'coeExpired', labelKey: 'flagCoeExpired' },
  { key: 'coeMissing', labelKey: 'flagCoeMissing' },
  { key: 'caawPending', labelKey: 'flagCaawPending' },
  { key: 'passportExpiringSoon', labelKey: 'flagPassportExpiringSoon' },
  { key: 'passportExpired', labelKey: 'flagPassportExpired' },
];
