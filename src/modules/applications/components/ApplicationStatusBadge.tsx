'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import { APPLICATION_STATUS_LABELS } from '@/modules/applications/constants/application.constants';
import type { ApplicationStatusBadgeProps } from '@/modules/applications/types/component.types';
import type { ApplicationStatus } from '@/modules/applications/types/application.types';

const STATUS_TO_TONE: Record<ApplicationStatus, NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>> = {
  draft: 'muted',
  submitted: 'submitted',
  received: 'submitted',
  under_review: 'underReview',
  documents_requested: 'featured',
  assessment_required: 'underReview',
  interview_scheduled: 'underReview',
  offer_made: 'accepted',
  offer_accepted: 'accepted',
  pre_enrolment: 'submitted',
  coe_issued: 'submitted',
  enrolled: 'enrolled',
  withdrawn: 'muted',
  declined: 'rejected',
  waitlisted: 'featured',
};

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const t = useTranslations('Applications');
  const labelKey = APPLICATION_STATUS_LABELS[status] ?? 'statusDraft';
  const tone = STATUS_TO_TONE[status] ?? 'muted';

  return (
    <StatusBadge tone={tone}>
      {t(labelKey)}
    </StatusBadge>
  );
}
