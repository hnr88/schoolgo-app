'use client';

import { useTranslations } from 'next-intl';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CommissionRowItem } from '@/modules/agent-commissions/components/CommissionRowItem';
import type { CommissionRow } from '@/modules/agent-commissions/types/agent-commissions.types';

interface CommissionsTableProps {
  rows: CommissionRow[];
}

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function CommissionsTable({ rows }: CommissionsTableProps) {
  const t = useTranslations('AgentCommissions');

  return (
    <section className='rounded-xl border border-divider bg-card shadow-1'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
              <TableHead className={`pl-5 ${HEAD_CLASS}`}>{t('colApplication')}</TableHead>
              <TableHead className={HEAD_CLASS}>{t('colSchool')}</TableHead>
              <TableHead className={HEAD_CLASS}>{t('colMilestone')}</TableHead>
              <TableHead className={`text-right ${HEAD_CLASS}`}>{t('colRate')}</TableHead>
              <TableHead className={`text-right ${HEAD_CLASS}`}>{t('colExpected')}</TableHead>
              <TableHead className={`text-right ${HEAD_CLASS}`}>{t('colReceived')}</TableHead>
              <TableHead className={`pr-5 ${HEAD_CLASS}`}>{t('colStatus')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <CommissionRowItem key={row.documentId} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
