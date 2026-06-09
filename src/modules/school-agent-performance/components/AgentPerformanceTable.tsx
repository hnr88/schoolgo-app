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
import { usePerformanceSort } from '@/modules/school-agent-performance/hooks/usePerformanceSort';
import {
  formatAvgDays,
  formatRate,
} from '@/modules/school-agent-performance/lib/format-performance';
import {
  findTopPerformerKey,
  isLowConversion,
  rowKey,
} from '@/modules/school-agent-performance/lib/performance-badges';
import { PerformanceBadges } from '@/modules/school-agent-performance/components/PerformanceBadges';
import { SortHeaderButton } from '@/modules/school-agent-performance/components/SortHeaderButton';
import type { AgentPerformanceRow } from '@/modules/school-agent-performance/types/agent-performance.types';

interface AgentPerformanceTableProps {
  byAgent: AgentPerformanceRow[];
}

export function AgentPerformanceTable({ byAgent }: AgentPerformanceTableProps) {
  const t = useTranslations('SchoolAgentPerformance');
  const locale = useLocale();
  const { rows, sortKey, direction, handleSort } = usePerformanceSort(byAgent);
  const topPerformerKey = findTopPerformerKey(byAgent);

  return (
    <section className='flex flex-col gap-4 rounded-xl border border-divider bg-card p-6 shadow-1'>
      <h2 className='text-base font-semibold text-ink-900'>{t('tableTitle')}</h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('colAgent')}</TableHead>
              <TableHead className='text-right'>
                <SortHeaderButton
                  label={t('colSubmitted')}
                  active={sortKey === 'submitted'}
                  direction={direction}
                  onClick={() => handleSort('submitted')}
                />
              </TableHead>
              <TableHead className='text-right'>{t('colOffers')}</TableHead>
              <TableHead className='text-right'>{t('colAccepted')}</TableHead>
              <TableHead className='text-right'>{t('colEnrolled')}</TableHead>
              <TableHead className='text-right'>
                <SortHeaderButton
                  label={t('colOfferRate')}
                  active={sortKey === 'offerRate'}
                  direction={direction}
                  onClick={() => handleSort('offerRate')}
                />
              </TableHead>
              <TableHead className='text-right'>
                <SortHeaderButton
                  label={t('colAcceptanceRate')}
                  active={sortKey === 'acceptanceRate'}
                  direction={direction}
                  onClick={() => handleSort('acceptanceRate')}
                />
              </TableHead>
              <TableHead className='text-right'>{t('colAvgDays')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={rowKey(row)}>
                <TableCell className='font-medium text-ink-900'>
                  <span className='inline-flex flex-wrap items-center gap-2'>
                    {row.agentDocumentId === null
                      ? t('directApplications')
                      : (row.companyName ?? t('unnamedAgent'))}
                    <PerformanceBadges
                      isTopPerformer={rowKey(row) === topPerformerKey}
                      isLowConversion={isLowConversion(row)}
                    />
                  </span>
                </TableCell>
                <TableCell className='text-right tabular-nums'>{row.submitted}</TableCell>
                <TableCell className='text-right tabular-nums'>{row.offers}</TableCell>
                <TableCell className='text-right tabular-nums'>{row.accepted}</TableCell>
                <TableCell className='text-right tabular-nums'>{row.enrolled}</TableCell>
                <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                  {formatRate(row.offerRate, locale)}
                </TableCell>
                <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                  {formatRate(row.acceptanceRate, locale)}
                </TableCell>
                <TableCell className='text-right tabular-nums'>
                  {formatAvgDays(row.avgDaysToOffer, locale)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
