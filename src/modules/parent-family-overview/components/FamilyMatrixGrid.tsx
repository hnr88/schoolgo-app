'use client';

import { useTranslations } from 'next-intl';
import { ApplicationStatusBadge } from '@/modules/applications';
import { SurfaceCard } from '@/modules/core';
import type { FamilyMatrixGridProps } from '@/modules/parent-family-overview/types/family-overview.types';

export function FamilyMatrixGrid({ matrix }: FamilyMatrixGridProps) {
  const t = useTranslations('ParentFamilyOverview');

  return (
    <SurfaceCard className='overflow-x-auto p-0'>
      <table className='w-full min-w-max border-collapse text-sm'>
        <thead>
          <tr className='border-b'>
            <th className='sticky left-0 z-10 bg-card px-4 py-3 text-left font-medium'>
              {t('colStudent')}
            </th>
            {matrix.schools.map((school) => (
              <th key={school.documentId} className='px-4 py-3 text-left font-medium'>
                {school.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.rows.map((row) => (
            <tr key={row.studentDocumentId} className='border-b last:border-b-0'>
              <td className='sticky left-0 z-10 bg-card px-4 py-3 font-medium whitespace-nowrap'>
                {row.studentName}
              </td>
              {row.cells.map((cell, index) => (
                <td key={`${row.studentDocumentId}-${index}`} className='px-4 py-3'>
                  {cell ? (
                    <ApplicationStatusBadge status={cell.status} />
                  ) : (
                    <span className='text-foggy' aria-label={t('noApplication')}>
                      —
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SurfaceCard>
  );
}
