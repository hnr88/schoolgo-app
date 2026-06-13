'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  initialsOf,
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
    <TableRow>
      <TableCell>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8'>
            <AvatarFallback className='bg-rausch-50 text-xs font-semibold text-primary-strong'>
              {initialsOf(studentName || t('unnamedApplication'))}
            </AvatarFallback>
          </Avatar>
          <div className='flex min-w-0 flex-col'>
            <span className='truncate font-semibold text-ink-900'>
              {studentName || t('unnamedApplication')}
            </span>
            <span className='text-xs text-foggy'>
              {formatCommissionDate(row.createdAt, locale)}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className='text-sm text-ink-900'>{row.school?.name ?? '—'}</TableCell>
      <TableCell className='text-sm text-foggy'>
        {t(resolveMilestoneLabelKey(row.milestone))}
      </TableCell>
      <TableCell className='text-right text-sm tabular-nums text-foggy'>
        {formatRatePct(row.ratePct, locale)}
      </TableCell>
      <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
        {formatAud(row.expectedAmountAud ?? 0, currency)}
      </TableCell>
      <TableCell className='text-right tabular-nums text-ink-900'>
        {formatAud(row.receivedAmountAud ?? 0, currency)}
      </TableCell>
      <TableCell>
        <StatusBadge
          status={row.status}
          label={t(resolveStatusLabelKey(row.status))}
          styles={COMMISSION_STATUS_BADGE_STYLES}
        />
      </TableCell>
    </TableRow>
  );
}
