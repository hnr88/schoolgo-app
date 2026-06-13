'use client';

import { AdmissionLikelihoodRowCard } from '@/modules/parent-admission-likelihood/components/AdmissionLikelihoodRowCard';
import { useDemandSignals } from '@/modules/parent-admission-likelihood/queries/use-demand-signals.query';
import type { AdmissionLikelihoodGridProps } from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

export function AdmissionLikelihoodGrid({ rows }: AdmissionLikelihoodGridProps) {
  const schoolIds = rows.map((row) => row.school.documentId);
  const demandQueries = useDemandSignals(schoolIds, rows.length > 0);

  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {rows.map((row, index) => {
        const query = demandQueries[index];
        return (
          <AdmissionLikelihoodRowCard
            key={row.school.documentId}
            row={row}
            demand={query?.data}
            isDemandLoading={query?.isLoading ?? false}
          />
        );
      })}
    </div>
  );
}
