'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatAud } from '@/modules/agent-payments';
import type { MethodEarnings } from '@/modules/agent-earnings/types/agent-earnings.types';

interface EarningsMethodTableProps {
  byMethod: MethodEarnings[];
}

export function EarningsMethodTable({ byMethod }: EarningsMethodTableProps) {
  const t = useTranslations('AgentEarnings');

  return (
    <section className='flex flex-col gap-4 rounded-xl border border-divider bg-card p-6 shadow-1'>
      <h2 className='text-base font-semibold text-ink-900'>{t('methodTitle')}</h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('colMethod')}</TableHead>
              <TableHead className='text-right'>{t('colCount')}</TableHead>
              <TableHead className='text-right'>{t('colCompleted')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {byMethod.map((row) => (
              <TableRow key={row.method}>
                <TableCell className='font-medium text-ink-900'>
                  {t(`method.${row.method}`)}
                </TableCell>
                <TableCell className='text-right tabular-nums text-foreground'>
                  {row.count}
                </TableCell>
                <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                  {formatAud(row.completedAud)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
