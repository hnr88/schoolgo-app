'use client';

import { useTranslations } from 'next-intl';
import { Gauge } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SurfaceCard, SectionHeading } from '@/modules/core';
import { BenchmarkDeltaChip } from '@/modules/school-reputation/components/BenchmarkDeltaChip';
import { buildBenchmarkRows, formatScore, scoreDelta } from '@/modules/school-reputation/lib/school-reputation';
import type { Benchmark } from '@/modules/school-reputation/types/school-reputation.types';

interface BenchmarkPanelProps {
  benchmark: Benchmark;
}

export function BenchmarkPanel({ benchmark }: BenchmarkPanelProps) {
  const t = useTranslations('SchoolReputation');
  const rows = buildBenchmarkRows(benchmark);
  const dash = t('noScore');

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <SectionHeading
        level={3}
        icon={Gauge}
        title={t('benchmarkTitle')}
        description={t('benchmarkSubtitle', {
          sector: benchmark.school.sector ?? dash,
          state: benchmark.school.state ?? dash,
        })}
      />
      <div
        tabIndex={0}
        role='region'
        aria-label={t('benchmarkTableRegion')}
        className='table-scroll-region overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dimensionHeader')}</TableHead>
              <TableHead className='text-right'>{t('ownHeader')}</TableHead>
              <TableHead className='text-right'>{t('sectorHeader')}</TableHead>
              <TableHead className='text-right'>{t('stateHeader')}</TableHead>
              <TableHead className='text-right'>{t('vsPeersHeader')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.dimension}>
                <TableCell className='font-medium text-ink-900'>{t(`dimension_${row.dimension}`)}</TableCell>
                <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
                  {formatScore(row.own) ?? dash}
                </TableCell>
                <TableCell className='text-right tabular-nums text-foggy'>
                  {formatScore(row.sector) ?? dash}
                </TableCell>
                <TableCell className='text-right tabular-nums text-foggy'>
                  {formatScore(row.state) ?? dash}
                </TableCell>
                <TableCell className='text-right'>
                  <BenchmarkDeltaChip delta={scoreDelta(row.own, row.sector)} emptyLabel={dash} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className='text-xs text-foggy'>
        {t('benchmarkPeerCounts', {
          sector: benchmark.sector.count,
          state: benchmark.state.count,
        })}
      </p>
    </SurfaceCard>
  );
}
