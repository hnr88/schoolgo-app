'use client';

import { useTranslations } from 'next-intl';
import { StatusBadge } from '@/modules/core';
import { VERDICT_BADGE_STYLES } from '@/modules/agent-application-qa/constants/readiness.constants';
import type { ReadinessVerdict } from '@/modules/agent-application-qa/types/readiness.types';

export function VerdictBadge({ verdict }: { verdict: ReadinessVerdict }) {
  const t = useTranslations('AgentApplicationQa');
  return <StatusBadge status={verdict} label={t(`verdict_${verdict}`)} styles={VERDICT_BADGE_STYLES} />;
}
