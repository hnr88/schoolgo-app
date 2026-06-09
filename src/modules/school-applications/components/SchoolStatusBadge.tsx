'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import { SCHOOL_STATUS_LABEL_KEY } from '@/modules/school-applications/lib/school-application';
import type { SchoolApplicationStatus } from '@/modules/school-applications/types/school-applications.types';

const STATUS_TONE: Record<
  SchoolApplicationStatus,
  NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>
> = {
  draft: 'muted',
  submitted: 'submitted',
  received: 'submitted',
  under_review: 'underReview',
  documents_requested: 'featured',
  assessment_required: 'underReview',
  interview_scheduled: 'underReview',
  interview_completed: 'underReview',
  offer_made: 'accepted',
  offer_accepted: 'accepted',
  pre_enrolment: 'submitted',
  coe_issued: 'submitted',
  enrolled: 'enrolled',
  waitlisted: 'featured',
  declined: 'rejected',
  withdrawn: 'muted',
};

export function SchoolStatusBadge({ status }: { status: SchoolApplicationStatus }) {
  const t = useTranslations('SchoolApplications');
  return <StatusBadge tone={STATUS_TONE[status] ?? 'muted'}>{t(SCHOOL_STATUS_LABEL_KEY[status])}</StatusBadge>;
}
