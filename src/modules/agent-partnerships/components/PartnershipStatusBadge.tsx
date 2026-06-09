'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/design-system';
import {
  PARTNERSHIP_STATUS_LABEL_KEY,
  PARTNERSHIP_STATUS_TONE,
} from '@/modules/agent-partnerships/constants/agent-partnerships.constants';
import type { PartnershipStatus } from '@/modules/agent-partnerships/types/agent-partnership.types';

export function PartnershipStatusBadge({ status }: { status: PartnershipStatus }) {
  const t = useTranslations('AgentPartnerships');

  return (
    <StatusBadge tone={PARTNERSHIP_STATUS_TONE[status]} size='sm'>
      {t(PARTNERSHIP_STATUS_LABEL_KEY[status])}
    </StatusBadge>
  );
}
