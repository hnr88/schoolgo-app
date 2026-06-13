'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SurfaceCard } from '@/modules/core';
import { VerdictBadge } from '@/modules/agent-application-qa/components/VerdictBadge';
import { ReadinessGapRow } from '@/modules/agent-application-qa/components/ReadinessGapRow';
import { VERDICT_CARD_ACCENT } from '@/modules/agent-application-qa/constants/readiness.constants';
import type { SchoolReadinessResult } from '@/modules/agent-application-qa/types/readiness.types';

export function SchoolReadinessCard({
  result,
  schoolLabel,
}: {
  result: SchoolReadinessResult;
  schoolLabel: string;
}) {
  const t = useTranslations('AgentApplicationQa');
  const name = result.schoolName ?? schoolLabel;
  const hasGaps = result.gaps.length > 0;

  return (
    <SurfaceCard
      padding='none'
      className={cn('overflow-hidden border-l-4', VERDICT_CARD_ACCENT[result.verdict])}
    >
      <div className='flex flex-wrap items-center justify-between gap-3 px-4 py-4'>
        <div className='flex min-w-0 flex-col gap-0.5'>
          <span className='truncate text-sm font-semibold text-ink-900'>{name}</span>
          <span className='text-xs text-muted-foreground'>
            {hasGaps ? t('gapCount', { count: result.gaps.length }) : t('gapNone')}
          </span>
        </div>
        <VerdictBadge verdict={result.verdict} />
      </div>
      {hasGaps ? (
        <ul className='divide-y divide-border border-t border-border'>
          {result.gaps.map((gap) => (
            <ReadinessGapRow key={gap.criterion} gap={gap} />
          ))}
        </ul>
      ) : (
        <div className='flex items-center gap-2 border-t border-border px-4 py-3 text-sm text-emerald-700'>
          <CheckCircle2 className='h-4 w-4' aria-hidden='true' />
          {t('readyDetail')}
        </div>
      )}
    </SurfaceCard>
  );
}
