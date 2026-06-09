'use client';

import { useTranslations, useFormatter } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type {
  TuitionEditorRow,
  TuitionLevel,
} from '@/modules/school-tuition-editor/types/school-tuition-editor.types';

interface TuitionTableProps {
  rows: TuitionEditorRow[];
  isAdmin: boolean;
  onChange: (level: TuitionLevel, value: string) => void;
}

const HEAD_CLASS = 'text-xs font-semibold uppercase tracking-wide text-foggy';

export function TuitionTable({ rows, isAdmin, onChange }: TuitionTableProps) {
  const t = useTranslations('SchoolTuition');
  const format = useFormatter();

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-divider bg-muted/40 hover:bg-muted/40'>
          <TableHead className={`pl-5 ${HEAD_CLASS}`}>{t('columnLevel')}</TableHead>
          <TableHead className={`pr-5 ${HEAD_CLASS}`}>{t('columnAmount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.level}
            className='border-b border-divider transition-colors hover:bg-muted/60'
            data-testid='tuition-row'
          >
            <TableCell className='pl-5 py-3.5 font-semibold text-ink-900'>
              {t(`levels.${row.level}`)}
            </TableCell>
            <TableCell className='pr-5 py-3.5'>
              {isAdmin ? (
                <div className='flex max-w-56 flex-col gap-1'>
                  <Input
                    inputMode='numeric'
                    value={row.value}
                    onChange={(e) => onChange(row.level, e.target.value)}
                    placeholder={t('amountPlaceholder')}
                    aria-invalid={row.hasError}
                    aria-label={t(`levels.${row.level}`)}
                    data-testid={`tuition-input-${row.level}`}
                  />
                  {row.hasError && (
                    <p className='text-sm text-destructive'>{t('validationInvalid')}</p>
                  )}
                </div>
              ) : (
                <span className='text-sm text-ink-900'>
                  {row.serverAmount !== null
                    ? format.number(row.serverAmount, {
                        style: 'currency',
                        currency: 'AUD',
                        maximumFractionDigits: 0,
                      })
                    : t('notSet')}
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
