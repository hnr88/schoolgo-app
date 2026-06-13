'use client';

import { useTranslations } from 'next-intl';
import { Award } from 'lucide-react';

import { cn } from '@/lib/utils';
import { resolveTierLabelKey } from '@/modules/agent-training/constants/agent-training.constants';
import type { TrainingTier } from '@/modules/agent-training/types/agent-training.types';

const TIER_STYLES: Record<TrainingTier, string> = {
  none: 'bg-muted text-foggy',
  foundation: 'bg-babu-50 text-babu-700',
  intermediate: 'bg-vivid-iris-soft text-vivid-iris',
  advanced: 'bg-vivid-mint-soft text-babu-700',
};

export function TierBadge({ tier }: { tier: TrainingTier }) {
  const t = useTranslations('AgentTraining');
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-pill px-2.5 text-xs font-semibold',
        TIER_STYLES[tier],
      )}
    >
      <Award className='size-3 shrink-0' strokeWidth={1.75} aria-hidden='true' />
      {t(resolveTierLabelKey(tier))}
    </span>
  );
}
