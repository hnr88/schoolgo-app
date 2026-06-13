'use client';

import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FitSortButton } from '@/modules/school-applicant-fit/components/FitSortButton';
import { FitTriageRow } from '@/modules/school-applicant-fit/components/FitTriageRow';
import type {
  ApplicantFitQueryParams,
  ApplicantFitRow,
  FitSortField,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

interface FitTriageTableProps {
  rows: ApplicantFitRow[];
  params: ApplicantFitQueryParams;
  onSort: (field: FitSortField) => void;
  onOpenBreakdown: (documentId: string) => void;
}

export function FitTriageTable({ rows, params, onSort, onOpenBreakdown }: FitTriageTableProps) {
  const t = useTranslations('SchoolApplicantFit');

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colApplicant')}</TableHead>
            <TableHead>{t('colAgent')}</TableHead>
            <TableHead>{t('colYearLevel')}</TableHead>
            <TableHead>{t('colOverallFit')}</TableHead>
            <TableHead className='text-right'>
              <FitSortButton
                label={t('colScore')}
                active={params.sort === 'score'}
                order={params.order}
                onClick={() => onSort('score')}
              />
            </TableHead>
            <TableHead>
              <FitSortButton
                label={t('colBand')}
                active={params.sort === 'band'}
                order={params.order}
                onClick={() => onSort('band')}
              />
            </TableHead>
            <TableHead className='text-right'>{t('colActions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <FitTriageRow
              key={row.applicationDocumentId}
              row={row}
              onOpenBreakdown={onOpenBreakdown}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
