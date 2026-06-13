'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { resolveStatusLabelKey } from '@/modules/agent-pipeline-forecast/constants/agent-pipeline-forecast.constants';
import {
  formatDays,
  formatSampleCount,
} from '@/modules/agent-pipeline-forecast/lib/format-forecast';
import type { StageStat } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface StageStatsTableProps {
  stages: StageStat[];
}

export function StageStatsTable({ stages }: StageStatsTableProps) {
  const t = useTranslations('AgentForecast');
  const locale = useLocale();

  return (
    <div
      tabIndex={0}
      role='region'
      aria-label={t('stageStatsRegion')}
      className='table-scroll-region overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colTransition')}</TableHead>
            <TableHead className='text-right'>{t('colMedianDays')}</TableHead>
            <TableHead className='text-right'>{t('colSamples')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stages.map((stage) => (
            <TableRow key={`${stage.fromStatus}-${stage.toStatus}`}>
              <TableCell className='font-medium text-ink-900'>
                {t('transitionLabel', {
                  from: t(resolveStatusLabelKey(stage.fromStatus)),
                  to: t(resolveStatusLabelKey(stage.toStatus)),
                })}
              </TableCell>
              <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                {formatDays(stage.medianDays, locale)}
              </TableCell>
              <TableCell className='text-right tabular-nums text-foggy'>
                {formatSampleCount(stage.sampleCount, locale)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
