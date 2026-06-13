'use client';

import { useTranslations } from 'next-intl';
import { StatTile } from '@/modules/core';
import { VERDICT_ICON } from '@/modules/agent-application-qa/constants/readiness.constants';
import { countVerdict } from '@/modules/agent-application-qa/lib/sort-results';
import type { SchoolReadinessResult } from '@/modules/agent-application-qa/types/readiness.types';

export function ReadinessSummary({ results }: { results: readonly SchoolReadinessResult[] }) {
  const t = useTranslations('AgentApplicationQa');

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      <StatTile
        icon={VERDICT_ICON.ready}
        label={t('verdict_ready')}
        value={countVerdict(results, 'ready')}
        iconClassName='text-emerald-500'
      />
      <StatTile
        icon={VERDICT_ICON.warn}
        label={t('verdict_warn')}
        value={countVerdict(results, 'warn')}
        iconClassName='text-amber-500'
      />
      <StatTile
        icon={VERDICT_ICON.block}
        label={t('verdict_block')}
        value={countVerdict(results, 'block')}
        iconClassName='text-rose-500'
      />
    </div>
  );
}
