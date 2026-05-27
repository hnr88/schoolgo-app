import type {
  PreEnrolmentItemStatus,
  PreEnrolmentItemType,
} from '@/modules/applications/types/parent-pre-enrolment.types';

export const PRE_ENROLMENT_STATUS_BADGE: Record<PreEnrolmentItemStatus, string> = {
  approved: 'bg-vivid-mint-soft text-vivid-mint',
  submitted: 'bg-vivid-amber-soft text-vivid-amber',
  pending: 'bg-muted text-foggy',
  rejected: 'bg-vivid-coral-soft text-vivid-coral',
};

export const PRE_ENROLMENT_ITEM_LABEL_KEY: Record<PreEnrolmentItemType, string> = {
  written_agreement: 'itemType_written_agreement',
  oshc: 'itemType_oshc',
  guardian_nomination: 'itemType_guardian_nomination',
  financial_evidence: 'itemType_financial_evidence',
  custom: 'itemType_custom',
};
