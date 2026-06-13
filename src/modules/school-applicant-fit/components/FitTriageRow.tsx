'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FitBandBadge } from '@/modules/school-applicant-fit/components/FitBandBadge';
import { FitStatusBadge } from '@/modules/school-applicant-fit/components/FitStatusBadge';
import { formatScore } from '@/modules/school-applicant-fit/lib/format-fit';
import type { ApplicantFitRow } from '@/modules/school-applicant-fit/types/applicant-fit.types';

interface FitTriageRowProps {
  row: ApplicantFitRow;
  onOpenBreakdown: (documentId: string) => void;
}

export function FitTriageRow({ row, onOpenBreakdown }: FitTriageRowProps) {
  const t = useTranslations('SchoolApplicantFit');
  const locale = useLocale();

  return (
    <TableRow>
      <TableCell className='font-medium text-ink-900'>
        {row.student?.name || t('unknownApplicant')}
        {row.student?.nationality ? (
          <span className='block text-xs font-normal text-foggy'>{row.student.nationality}</span>
        ) : null}
      </TableCell>
      <TableCell className='text-foggy'>
        {row.agent?.companyName ?? t('directApplication')}
      </TableCell>
      <TableCell className='text-foggy'>{row.targetYearLevel ?? '—'}</TableCell>
      <TableCell>
        <FitStatusBadge status={row.overallFit} />
      </TableCell>
      <TableCell className='text-right font-semibold tabular-nums text-ink-900'>
        {formatScore(row.score, locale)}
      </TableCell>
      <TableCell>
        <FitBandBadge band={row.band} />
      </TableCell>
      <TableCell className='text-right'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onOpenBreakdown(row.applicationDocumentId)}
        >
          {t('viewBreakdown')}
        </Button>
      </TableCell>
    </TableRow>
  );
}
