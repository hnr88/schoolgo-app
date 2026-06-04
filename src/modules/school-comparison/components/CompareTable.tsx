'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { COMPARE_ATTRIBUTES } from '@/modules/school-comparison/constants/comparison.constants';
import { createEnumTranslator } from '@/modules/school-comparison/lib/compare-enum-labels';
import { formatCompareValue } from '@/modules/school-comparison/lib/format-comparison';
import type {
  CompareFormatHelpers,
  CompareLabels,
  SchoolHit,
} from '@/modules/school-comparison/types/comparison.types';

interface CompareTableProps {
  schools: SchoolHit[];
  labels: CompareLabels;
  onRemove: (id: string) => void;
  schoolKey: (school: SchoolHit) => string;
}

const percentFormatter = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 1 });

export function CompareTable({ schools, labels, onRemove, schoolKey }: CompareTableProps) {
  const t = useTranslations('SchoolComparison');
  const tEnum = useTranslations('SchoolSearch.spec');

  const helpers: CompareFormatHelpers = {
    labels,
    translateEnum: createEnumTranslator((key) => tEnum(key as never)),
    formatPercent: (value) => t('valuePercent', { value: percentFormatter.format(value) }),
  };

  return (
    <div className='overflow-x-auto rounded-lg border border-border bg-card shadow-1'>
      <Table className='min-w-3xl'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48 align-bottom text-foggy'>{t('attributeColumn')}</TableHead>
            {schools.map((school) => {
              const id = schoolKey(school);
              return (
                <TableHead key={id} className='align-bottom'>
                  <div className='flex items-start justify-between gap-2 py-2'>
                    {school.slug ? (
                      <Link
                        href={`/parent/schools/${school.slug}`}
                        className='text-body-sm font-semibold text-ink-900 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                      >
                        {school.name}
                      </Link>
                    ) : (
                      <span className='text-body-sm font-semibold text-ink-900'>
                        {school.name}
                      </span>
                    )}
                    <button
                      type='button'
                      onClick={() => onRemove(id)}
                      aria-label={t('removeColumn', { name: school.name })}
                      className='inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-foggy transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                    >
                      <X className='h-4 w-4' aria-hidden='true' />
                    </button>
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {COMPARE_ATTRIBUTES.map((attribute) => (
            <TableRow key={attribute.key}>
              <TableCell className='font-medium text-foggy'>{t(attribute.labelKey)}</TableCell>
              {schools.map((school) => (
                <TableCell key={schoolKey(school)} className='whitespace-normal text-ink-900'>
                  {formatCompareValue(attribute, school, helpers)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
