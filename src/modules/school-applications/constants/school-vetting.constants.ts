import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import type { StatusBadge } from '@/modules/design-system';
import type {
  VettingCheckStatus,
  VettingDocVerificationStatus,
  VettingIntegrityStatus,
  VettingOverall,
} from '@/modules/school-applications/types/school-applications.types';

type BadgeTone = NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>;
type IconComponent = typeof CircleCheck;

export const VETTING_CHECK_TONE: Record<VettingCheckStatus, BadgeTone> = {
  pass: 'accepted',
  warning: 'featured',
  fail: 'rejected',
};

export const VETTING_CHECK_ICON: Record<VettingCheckStatus, IconComponent> = {
  pass: CircleCheck,
  warning: CircleAlert,
  fail: CircleX,
};

export const VETTING_CHECK_ICON_CLASS: Record<VettingCheckStatus, string> = {
  pass: 'text-babu-700',
  warning: 'text-arches-700',
  fail: 'text-rausch-700',
};

export const VETTING_INTEGRITY_TONE: Record<VettingIntegrityStatus, BadgeTone> = {
  clear: 'accepted',
  flagged: 'featured',
  invalidated: 'rejected',
};

export const VETTING_DOC_VERIFICATION_TONE: Record<VettingDocVerificationStatus, BadgeTone> = {
  unverified: 'muted',
  verifying: 'submitted',
  issuer_verified: 'accepted',
  direct_delivered: 'accepted',
  revoked: 'rejected',
};

export const VETTING_OVERALL_TONE: Record<VettingOverall, BadgeTone> = {
  pass: 'accepted',
  review: 'featured',
  fail: 'rejected',
};
