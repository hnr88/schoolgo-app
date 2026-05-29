'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import type { AgentPartnershipStatus } from '@/modules/school-partnerships/types/school-partnerships.types';

type Tone = NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>;

const STATUS_TONE: Record<AgentPartnershipStatus, Tone> = {
  active: 'accepted',
  pending: 'featured',
  denied: 'rejected',
  removed: 'muted',
};

const STATUS_LABEL: Record<AgentPartnershipStatus, string> = {
  active: 'statusApproved',
  pending: 'statusPending',
  denied: 'statusDenied',
  removed: 'statusDenied',
};

export function PartnershipStatusBadge({ status }: { status: AgentPartnershipStatus }) {
  const t = useTranslations('SchoolPartnerships');
  return <StatusBadge tone={STATUS_TONE[status]}>{t(STATUS_LABEL[status])}</StatusBadge>;
}
