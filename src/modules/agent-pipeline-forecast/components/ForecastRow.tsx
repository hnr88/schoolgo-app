'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TableCell, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/modules/core';
import {
  RISK_BADGE_STYLES,
  RISK_LABEL_KEY,
  resolveStatusLabelKey,
} from '@/modules/agent-pipeline-forecast/constants/agent-pipeline-forecast.constants';
import {
  formatProjectedDate,
  formatStudentName,
} from '@/modules/agent-pipeline-forecast/lib/format-forecast';
import type { ForecastItem } from '@/modules/agent-pipeline-forecast/types/agent-pipeline-forecast.types';

interface ForecastRowProps {
  item: ForecastItem;
}

export function ForecastRow({ item }: ForecastRowProps) {
  const t = useTranslations('AgentForecast');
  const locale = useLocale();

  return (
    <TableRow>
      <TableCell className='font-medium text-ink-900'>
        {formatStudentName(item, t('unnamedStudent'))}
      </TableCell>
      <TableCell className='text-foggy'>{item.school?.name ?? t('unnamedSchool')}</TableCell>
      <TableCell className='text-foggy'>{t(resolveStatusLabelKey(item.status))}</TableCell>
      <TableCell className='text-foggy'>
        {item.nextStatus ? t(resolveStatusLabelKey(item.nextStatus)) : '—'}
      </TableCell>
      <TableCell className='tabular-nums text-ink-900'>
        {formatProjectedDate(item.projectedNextStageAt, locale)}
      </TableCell>
      <TableCell>
        <StatusBadge
          status={item.risk}
          label={t(RISK_LABEL_KEY[item.risk])}
          styles={RISK_BADGE_STYLES}
        />
      </TableCell>
    </TableRow>
  );
}
