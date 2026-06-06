'use client';

import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SectionHeading, SurfaceCard, EmptyState } from '@/modules/core';
import { formatRate } from '@/modules/school-dashboard/lib/school-analytics.lib';
import type { FunnelAgentSource } from '@/modules/school-dashboard/types/school-analytics.types';

interface Props {
  agentSource: FunnelAgentSource[];
}

export function SchoolAgentSourceTable({ agentSource }: Props) {
  const t = useTranslations('SchoolAnalytics');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading title={t('agentSourceTitle')} description={t('agentSourceSubtitle')} level={2} />

      {agentSource.length === 0 ? (
        <EmptyState framed icon={Building2} title={t('agentSourceEmpty')} description={t('agentSourceEmptyHint')} />
      ) : (
        <SurfaceCard padding='none' className='overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow className='border-b border-divider hover:bg-transparent'>
                <TableHead className='pl-5 text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnAgent')}
                </TableHead>
                <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnApplications')}
                </TableHead>
                <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnOffers')}
                </TableHead>
                <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnEnrolments')}
                </TableHead>
                <TableHead className='pr-5 text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnConversion')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentSource.map((row) => (
                <TableRow
                  key={row.agentDocumentId ?? 'direct'}
                  className='h-14 border-b border-divider last:border-0 hover:bg-muted'
                >
                  <TableCell className='pl-5 py-3.5 font-semibold text-ink-900'>
                    {row.agentCompanyName ?? t('directApplication')}
                  </TableCell>
                  <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
                    {row.applications}
                  </TableCell>
                  <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
                    {row.offers}
                  </TableCell>
                  <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
                    {row.enrolments}
                  </TableCell>
                  <TableCell className='pr-5 py-3.5 text-right text-sm font-semibold tabular-nums text-ink-900'>
                    {formatRate(row.conversionRate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SurfaceCard>
      )}
    </section>
  );
}
