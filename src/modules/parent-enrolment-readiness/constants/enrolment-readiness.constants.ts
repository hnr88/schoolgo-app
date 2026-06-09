import type {
  ReadinessItemStatus,
  ReadinessItemType,
} from '@/modules/parent-enrolment-readiness/types/enrolment-readiness.types';

export const READINESS_STATUS_BADGE: Record<ReadinessItemStatus, string> = {
  approved: 'bg-vivid-mint-soft text-vivid-mint',
  submitted: 'bg-vivid-amber-soft text-arches-700',
  pending: 'bg-muted text-foggy',
  rejected: 'bg-vivid-coral-soft text-vivid-coral-strong',
};

// Reuses the established ParentApplications.itemType_* label keys.
export const READINESS_ITEM_LABEL_KEY: Record<ReadinessItemType, string> = {
  written_agreement: 'itemType_written_agreement',
  oshc: 'itemType_oshc',
  guardian_nomination: 'itemType_guardian_nomination',
  financial_evidence: 'itemType_financial_evidence',
  custom: 'itemType_custom',
};
