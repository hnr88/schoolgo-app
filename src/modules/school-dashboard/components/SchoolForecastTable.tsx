'use client';

import { useTranslations } from 'next-intl';
import { CalendarRange } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SectionHeading, SurfaceCard, EmptyState } from '@/modules/core';
import type { ForecastIntake } from '@/modules/school-dashboard/types/school-analytics.types';

interface Props {
  intakes: ForecastIntake[];
}

function formatNullableNumber(value: number | null, fallback: string): string {
  return value === null ? fallback : String(value);
}

export function SchoolForecastTable({ intakes }: Props) {
  const t = useTranslations('SchoolAnalytics');

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading title={t('forecastTitle')} description={t('forecastSubtitle')} level={2} />

      {intakes.length === 0 ? (
        <EmptyState framed icon={CalendarRange} title={t('forecastEmpty')} description={t('forecastEmptyHint')} />
      ) : (
        <SurfaceCard padding='none' className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow className='border-b border-divider hover:bg-transparent'>
                <TableHead className='pl-5 text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnIntake')}
                </TableHead>
                <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnYearLevel')}
                </TableHead>
                <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnCapacityTotal')}
                </TableHead>
                <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnCapacityRemaining')}
                </TableHead>
                <TableHead className='text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnPipeline')}
                </TableHead>
                <TableHead className='pr-5 text-right text-xs font-semibold uppercase tracking-wide text-foggy'>
                  {t('columnProjected')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intakes.map((intake, index) => {
                const pipelineTotal =
                  intake.pipeline.submitted +
                  intake.pipeline.inReview +
                  intake.pipeline.offered +
                  intake.pipeline.accepted +
                  intake.pipeline.enrolled;
                return (
                  <TableRow
                    key={`${intake.targetIntake}-${intake.targetYearLevel ?? index}`}
                    className='h-14 border-b border-divider last:border-0 hover:bg-muted'
                  >
                    <TableCell className='pl-5 py-3.5 font-semibold text-ink-900'>
                      {intake.targetIntake}
                    </TableCell>
                    <TableCell className='py-3.5 text-sm text-foggy'>
                      {intake.targetYearLevel ?? '—'}
                    </TableCell>
                    <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
                      {formatNullableNumber(intake.capacityTotal, '—')}
                    </TableCell>
                    <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
                      {formatNullableNumber(intake.capacityRemaining, '—')}
                    </TableCell>
                    <TableCell className='py-3.5 text-right text-sm tabular-nums text-foggy'>
                      {pipelineTotal}
                    </TableCell>
                    <TableCell className='pr-5 py-3.5 text-right text-sm font-semibold tabular-nums text-ink-900'>
                      {intake.projectedEnrolment}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SurfaceCard>
      )}
    </section>
  );
}
