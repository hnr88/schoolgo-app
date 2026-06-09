'use client';

import { FitReportRowCard } from '@/modules/parent-fit-report/components/FitReportRowCard';
import type { FitReportGridProps } from '@/modules/parent-fit-report/types/fit-report.types';

export function FitReportGrid({ rows }: FitReportGridProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {rows.map((row) => (
        <FitReportRowCard key={row.school.documentId} row={row} />
      ))}
    </div>
  );
}
