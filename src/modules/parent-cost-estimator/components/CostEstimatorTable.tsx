'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { formatAud } from '@/modules/parent-cost-estimator/lib/format-aud';
import type { CostEstimatorRow } from '@/modules/parent-cost-estimator/types/cost-estimator.types';

interface CostEstimatorTableProps {
  rows: CostEstimatorRow[];
}

export function CostEstimatorTable({ rows }: CostEstimatorTableProps) {
  const t = useTranslations('ParentCostEstimator');

  return (
    <div className='overflow-x-auto rounded-xl border border-divider bg-card shadow-1'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colSchool')}</TableHead>
            <TableHead className='text-right'>{t('colAnnual')}</TableHead>
            <TableHead className='text-right'>{t('colTotal')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.documentId} className={cn(row.isCheapest && 'bg-vivid-mint-soft/40')}>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted'>
                    {row.logoUrl ? (
                      <Image
                        src={row.logoUrl}
                        alt=''
                        width={36}
                        height={36}
                        className='h-9 w-9 object-cover'
                      />
                    ) : (
                      <Building2 className='h-4 w-4 text-foggy' aria-hidden='true' />
                    )}
                  </span>
                  <div className='flex flex-col gap-1'>
                    <span className='font-medium text-ink-900'>{row.name}</span>
                    <span className='flex flex-wrap items-center gap-1.5'>
                      {row.location ? (
                        <span className='text-xs text-foggy'>{row.location}</span>
                      ) : null}
                      {row.isCheapest ? (
                        <Badge className='bg-vivid-mint-soft text-vivid-mint'>
                          {t('badgeCheapest')}
                        </Badge>
                      ) : null}
                      {row.scholarshipAvailable ? (
                        <Badge variant='outline'>{t('badgeScholarship')}</Badge>
                      ) : null}
                      {row.boardingAvailable ? (
                        <Badge variant='outline'>{t('badgeBoarding')}</Badge>
                      ) : null}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className='text-right tabular-nums text-foreground'>
                {row.annualBase === null ? (
                  <span className='text-foggy'>{t('feeOnRequest')}</span>
                ) : (
                  formatAud(row.annualBase)
                )}
              </TableCell>
              <TableCell
                className={cn(
                  'text-right font-semibold tabular-nums',
                  row.isCheapest ? 'text-vivid-mint' : 'text-ink-900',
                )}
              >
                {row.projection === null ? (
                  <span className='font-normal text-foggy'>{t('feeOnRequest')}</span>
                ) : (
                  formatAud(row.projection.total)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
