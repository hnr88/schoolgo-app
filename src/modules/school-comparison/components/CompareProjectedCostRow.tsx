'use client';

import { useTranslations } from 'next-intl';
import { TableCell, TableRow } from '@/components/ui/table';
import { DEFAULT_RATE_PCT, DEFAULT_YEARS, formatAud } from '@/modules/parent-cost-estimator';
import { projectedCompareTotal } from '@/modules/school-comparison/lib/projected-compare-cost';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

interface CompareProjectedCostRowProps {
  schools: SchoolHit[];
  schoolKey: (school: SchoolHit) => string;
}

export function CompareProjectedCostRow({ schools, schoolKey }: CompareProjectedCostRowProps) {
  const t = useTranslations('SchoolComparison');

  return (
    <TableRow>
      <TableCell className='font-medium text-foggy'>
        <div className='flex flex-col gap-0.5'>
          <span>{t('attrProjectedCost', { years: DEFAULT_YEARS })}</span>
          <span className='text-xs font-normal'>
            {t('projectedCostHint', { rate: DEFAULT_RATE_PCT })}
          </span>
        </div>
      </TableCell>
      {schools.map((school) => {
        const total = projectedCompareTotal(school);
        return (
          <TableCell key={schoolKey(school)} className='whitespace-normal'>
            {total === null ? (
              <span className='text-foggy'>{t('projectedCostNoData')}</span>
            ) : (
              <span className='font-semibold text-ink-900'>{formatAud(total)}</span>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
