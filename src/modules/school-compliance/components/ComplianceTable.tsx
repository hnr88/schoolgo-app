'use client';

import { useTranslations } from 'next-intl';
import { PencilLine } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DataTableShell, StatusBadge } from '@/modules/core';
import { formatComplianceDate } from '@/modules/school-compliance/lib/format-compliance-date';
import {
  LIFECYCLE_LABEL_KEY,
  LIFECYCLE_STYLES,
  BUCKET_LABEL_KEY,
  BUCKET_STYLES,
  PASSPORT_STATUS_LABEL_KEY,
  PASSPORT_STATUS_STYLES,
} from '@/modules/school-compliance/constants/compliance.constants';
import type { CoeRegisterEntry } from '@/modules/school-compliance/types/school-compliance.types';

interface Props {
  entries: CoeRegisterEntry[];
  onAnnotate: (entry: CoeRegisterEntry) => void;
}

export function ComplianceTable({ entries, onAnnotate }: Props) {
  const t = useTranslations('SchoolCompliance');

  return (
    <DataTableShell className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colStudent')}</TableHead>
            <TableHead>{t('colCoeNumber')}</TableHead>
            <TableHead>{t('colCoeEnd')}</TableHead>
            <TableHead>{t('colLifecycle')}</TableHead>
            <TableHead>{t('colExpiry')}</TableHead>
            <TableHead>{t('colPassport')}</TableHead>
            <TableHead className='text-right'>{t('colActions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.applicationDocumentId}>
              <TableCell>
                <span className='font-medium text-ink-900'>{entry.studentName || t('unknownStudent')}</span>
                {entry.agentCompany ? (
                  <span className='block text-xs text-foggy'>{entry.agentCompany}</span>
                ) : null}
              </TableCell>
              <TableCell className='tabular-nums'>{entry.coeNumber ?? '—'}</TableCell>
              <TableCell className='tabular-nums'>{formatComplianceDate(entry.coeEndDate)}</TableCell>
              <TableCell>
                <StatusBadge
                  status={entry.lifecycleState}
                  label={t(LIFECYCLE_LABEL_KEY[entry.lifecycleState])}
                  styles={LIFECYCLE_STYLES}
                />
              </TableCell>
              <TableCell>
                <StatusBadge
                  status={entry.expiryBucket}
                  label={t(BUCKET_LABEL_KEY[entry.expiryBucket])}
                  styles={BUCKET_STYLES}
                />
              </TableCell>
              <TableCell>
                <StatusBadge
                  status={entry.passport.status}
                  label={t(PASSPORT_STATUS_LABEL_KEY[entry.passport.status])}
                  styles={PASSPORT_STATUS_STYLES}
                />
              </TableCell>
              <TableCell className='text-right'>
                <Button variant='ghost' size='sm' className='gap-1.5' onClick={() => onAnnotate(entry)}>
                  <PencilLine className='h-4 w-4' />
                  {t('annotate')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableShell>
  );
}
