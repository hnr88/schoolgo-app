'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatAvgDays, formatOfferRate } from '@/modules/agent-analytics/lib/format-analytics';
import { SortHeaderButton } from '@/modules/agent-analytics/components/SortHeaderButton';
import type {
  AnalyticsSortDirection,
  AnalyticsSortKey,
  SchoolAnalyticsRow,
} from '@/modules/agent-analytics/types/agent-analytics.types';

interface SchoolAnalyticsTableProps {
  bySchool: SchoolAnalyticsRow[];
}

export function SchoolAnalyticsTable({ bySchool }: SchoolAnalyticsTableProps) {
  const t = useTranslations('AgentAnalytics');
  const locale = useLocale();
  const [sortKey, setSortKey] = useState<AnalyticsSortKey>('submitted');
  const [direction, setDirection] = useState<AnalyticsSortDirection>('desc');

  const handleSort = (key: AnalyticsSortKey) => {
    if (key === sortKey) {
      setDirection((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setDirection('desc');
    }
  };

  const rows = useMemo(() => {
    const sign = direction === 'desc' ? -1 : 1;
    return [...bySchool].sort((a, b) => sign * (a[sortKey] - b[sortKey]));
  }, [bySchool, sortKey, direction]);

  return (
    <section className='flex flex-col gap-4 rounded-xl border border-divider bg-card p-6 shadow-1'>
      <h2 className='text-base font-semibold text-ink-900'>{t('tableTitle')}</h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('colSchool')}</TableHead>
              <TableHead className='text-right'>
                <SortHeaderButton
                  label={t('colSubmitted')}
                  active={sortKey === 'submitted'}
                  direction={direction}
                  onClick={() => handleSort('submitted')}
                />
              </TableHead>
              <TableHead className='text-right'>{t('colOffers')}</TableHead>
              <TableHead className='text-right'>{t('colEnrolled')}</TableHead>
              <TableHead className='text-right'>
                <SortHeaderButton
                  label={t('colOfferRate')}
                  active={sortKey === 'offerRate'}
                  direction={direction}
                  onClick={() => handleSort('offerRate')}
                />
              </TableHead>
              <TableHead className='text-right'>{t('colAvgDays')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.schoolDocumentId}>
                <TableCell className='font-medium text-ink-900'>
                  {row.schoolName ?? t('unnamedSchool')}
                </TableCell>
                <TableCell className='text-right tabular-nums'>{row.submitted}</TableCell>
                <TableCell className='text-right tabular-nums'>{row.offers}</TableCell>
                <TableCell className='text-right tabular-nums'>{row.enrolled}</TableCell>
                <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                  {formatOfferRate(row.offerRate, locale)}
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
