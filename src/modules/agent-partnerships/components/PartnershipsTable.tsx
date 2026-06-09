'use client';

import { useFormatter, useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SurfaceCard } from '@/modules/core';
import { PartnershipStatusBadge } from '@/modules/agent-partnerships/components/PartnershipStatusBadge';
import type { AgentPartnership } from '@/modules/agent-partnerships/types/agent-partnership.types';

export function PartnershipsTable({ partnerships }: { partnerships: AgentPartnership[] }) {
  const t = useTranslations('AgentPartnerships');
  const format = useFormatter();

  const formatDate = (value: string | null | undefined) =>
    value ? format.dateTime(new Date(value), { dateStyle: 'medium' }) : '—';

  return (
    <SurfaceCard padding='none' className='overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('schoolHeader')}</TableHead>
            <TableHead>{t('locationHeader')}</TableHead>
            <TableHead>{t('statusHeader')}</TableHead>
            <TableHead>{t('requestedByHeader')}</TableHead>
            <TableHead>{t('dateHeader')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partnerships.map((partnership) => {
            const location = [partnership.school?.suburb, partnership.school?.state]
              .filter(Boolean)
              .join(', ');
            return (
              <TableRow key={partnership.documentId}>
                <TableCell className='font-medium text-foreground'>
                  {partnership.school?.name || t('unknownSchool')}
                </TableCell>
                <TableCell className='text-muted-foreground'>{location || '—'}</TableCell>
                <TableCell>
                  <PartnershipStatusBadge status={partnership.status} />
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {partnership.requestedBy === 'school'
                    ? t('requestedBySchool')
                    : t('requestedByAgent')}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {partnership.status === 'removed'
                    ? formatDate(partnership.removedAt)
                    : formatDate(partnership.approvedAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </SurfaceCard>
  );
}
