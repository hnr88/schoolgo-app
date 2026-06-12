'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { COMPLETENESS_COMPLETE_THRESHOLD } from '@/modules/agent-profile/constants/agent-builder.constants';
import type { CompletenessSuggestion } from '@/modules/agent-profile/types/agent-profile.types';

interface CompletenessRingProps {
  completeness: number;
  nextBestAction: CompletenessSuggestion | null;
}

const SIZE = 96;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Pure-SVG progress ring for the profile builder. Renders the live completeness
 * percentage and, below it, the single highest-impact "next best action" the
 * agent should complete to climb the score (or a done state at 100%).
 */
export function CompletenessRing({ completeness, nextBestAction }: CompletenessRingProps) {
  const t = useTranslations('AgentProfileBuilder');
  const clamped = Math.max(0, Math.min(100, completeness));
  const isComplete = clamped >= COMPLETENESS_COMPLETE_THRESHOLD;
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;

  return (
    <div className='flex items-center gap-4'>
      <span
        className='relative flex shrink-0 items-center justify-center'
        role='img'
        aria-label={t('completenessAria', { percent: clamped })}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className='-rotate-90'>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill='none'
            strokeWidth={STROKE}
            className='stroke-muted'
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill='none'
            strokeWidth={STROKE}
            strokeLinecap='round'
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className={cn(
              'transition-all duration-500 ease-out-quart',
              isComplete ? 'stroke-vivid-mint' : 'stroke-primary',
            )}
          />
        </svg>
        <span className='absolute flex flex-col items-center'>
          <span className='font-display text-lg font-bold tabular-nums text-ink-900'>
            {clamped}%
          </span>
        </span>
      </span>

      <div className='flex flex-col gap-1'>
        <span className='text-sm font-semibold text-foreground'>{t('completenessTitle')}</span>
        {isComplete || !nextBestAction ? (
          <span className='text-sm text-vivid-mint'>{t('completenessDone')}</span>
        ) : (
          <span className='text-sm text-muted-foreground'>
            {t('completenessNextAction', {
              action: t(nextBestAction.labelKey),
              points: nextBestAction.weight,
            })}
          </span>
        )}
      </div>
    </div>
  );
}
