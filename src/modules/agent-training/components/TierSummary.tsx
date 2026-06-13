'use client';

import { useTranslations } from 'next-intl';
import { BadgeCheck, BookOpen } from 'lucide-react';

import { StatTile, SurfaceCard } from '@/modules/core';
import { TierBadge } from '@/modules/agent-training/components/TierBadge';
import type { TrainingTier } from '@/modules/agent-training/types/agent-training.types';

interface TierSummaryProps {
  tier: TrainingTier;
  activeCount: number;
  courseCount: number;
}

export function TierSummary({ tier, activeCount, courseCount }: TierSummaryProps) {
  const t = useTranslations('AgentTraining');

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      <SurfaceCard padding='sm' className='flex flex-col justify-between gap-3'>
        <span className='text-xs font-semibold uppercase tracking-wide text-foggy'>
          {t('tierLabel')}
        </span>
        <TierBadge tier={tier} />
      </SurfaceCard>
      <StatTile icon={BadgeCheck} label={t('activeCertsLabel')} value={activeCount} />
      <StatTile icon={BookOpen} label={t('coursesLabel')} value={courseCount} />
    </div>
  );
}
