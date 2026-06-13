'use client';

import { useLocale, useTranslations } from 'next-intl';

import { TableCell, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/modules/core';
import {
  COMMISSION_STATUS_BADGE_STYLES,
  resolveMilestoneLabelKey,
  resolveStatusLabelKey,
} from '@/modules/agent-commissions/constants/agent-commissions.constants';
import {
  formatAud,
  formatCommissionDate,
  formatRatePct,
  formatStudentName,
} from '@/modules/agent-commissions/lib/format-commissions';
import type { CommissionRow } from '@/modules/agent-commissions/types/agent-commissions.types';

interface CommissionRowItemProps {
  row: CommissionRow;
}

export function CommissionRowItem({ row }: CommissionRowItemProps) {
  const t = useTranslations('AgentCommissions');
  const locale = useLocale();
  const currency = row.currency ?? 'AUD';
  const studentName = formatStudentName(
    row.application?.student?.firstName,
    row.application?.student?.lastName,
  );

  return (
    <TableRow className='border-b border-divider align-top transition-colors hover:bg-muted/60'>
      <TableCell className='pl-5 py-3.5'>
        <span className='block font-semibold text-ink-900'>
          {studentName || t('unnamedApplication')}
        </span>
        <span className='block text-xs text-foggy'>
          {formatCommissionDate(row.createdAt, locale)}
        </span>
      </TableCell>
      <TableCell className='py-3.5 text-sm text-ink-900'>{row.school?.name ?? '—'}</TableCell>
      <TableCell className='py-3.5 text-sm text-foggy'>
        {t(resolveMilestoneLabelKey(row.milestone))}
      </TableCell>
      <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
        {formatRatePct(row.ratePct, locale)}
      </TableCell>
      <TableCell className='py-3.5 text-right font-semibold tabular-nums text-ink-900'>
        {formatAud(row.expectedAmountAud ?? 0, currency)}
      </TableCell>
      <TableCell className='py-3.5 text-right tabular-nums text-ink-900'>
        {formatAud(row.receivedAmountAud ?? 0, currency)}
      </TableCell>
      <TableCell className='pr-5 py-3.5'>
        <StatusBadge
          status={row.status}
          label={t(resolveStatusLabelKey(row.status))}
          styles={COMMISSION_STATUS_BADGE_STYLES}
        />
      </TableCell>
    </TableRow>
  );
}
