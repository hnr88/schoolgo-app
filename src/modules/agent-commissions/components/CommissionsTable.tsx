'use client';

import { useTranslations } from 'next-intl';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableShell } from '@/modules/core';
import { CommissionRowItem } from '@/modules/agent-commissions/components/CommissionRowItem';
import type { CommissionRow } from '@/modules/agent-commissions/types/agent-commissions.types';

interface CommissionsTableProps {
  rows: CommissionRow[];
}

export function CommissionsTable({ rows }: CommissionsTableProps) {
  const t = useTranslations('AgentCommissions');

  return (
    <DataTableShell className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colApplication')}</TableHead>
            <TableHead>{t('colSchool')}</TableHead>
            <TableHead>{t('colMilestone')}</TableHead>
            <TableHead className='text-right'>{t('colRate')}</TableHead>
            <TableHead className='text-right'>{t('colExpected')}</TableHead>
            <TableHead className='text-right'>{t('colReceived')}</TableHead>
            <TableHead>{t('colStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <CommissionRowItem key={row.documentId} row={row} />
          ))}
        </TableBody>
      </Table>
    </DataTableShell>
  );
}
