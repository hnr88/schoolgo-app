'use client';

import { useTranslations } from 'next-intl';

import { StatusBadge } from '@/modules/core';
import {
  LEVEL_BADGE_STYLES,
  resolveLevelLabelKey,
} from '@/modules/agent-training/constants/agent-training.constants';

export function LevelBadge({ level }: { level: string }) {
  const t = useTranslations('AgentTraining');
  return (
    <StatusBadge
      status={level}
      label={t(resolveLevelLabelKey(level))}
      styles={LEVEL_BADGE_STYLES}
    />
  );
}
