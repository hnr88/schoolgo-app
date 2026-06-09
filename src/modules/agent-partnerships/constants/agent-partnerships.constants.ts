import type { PartnershipStatus } from '@/modules/agent-partnerships/types/agent-partnership.types';

export const PARTNERSHIP_STATUS_TONE: Record<
  PartnershipStatus,
  'trust' | 'featured' | 'danger' | 'muted'
> = {
  active: 'trust',
  pending: 'featured',
  denied: 'danger',
  removed: 'muted',
};

export const PARTNERSHIP_STATUS_LABEL_KEY: Record<PartnershipStatus, string> = {
  active: 'statusActive',
  pending: 'statusPending',
  denied: 'statusDenied',
  removed: 'statusRemoved',
};
