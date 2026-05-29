'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Check, Loader2, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PartnershipStatusBadge } from '@/modules/school-partnerships/components/PartnershipStatusBadge';
import { formatPartnershipDate } from '@/modules/school-partnerships/lib/partnerships';
import type { PartnershipTableProps } from '@/modules/school-partnerships/types/component.types';

export function PartnershipTable({
  partnerships,
  variant,
  pendingActionId,
  onApprove,
  onDeny,
  onRemove,
}: PartnershipTableProps) {
  const t = useTranslations('SchoolPartnerships');
  const locale = useLocale();

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-border bg-muted/50 hover:bg-muted/50'>
          <TableHead className='pl-6'>{t('columnAgent')}</TableHead>
          <TableHead>{t('columnStatus')}</TableHead>
          <TableHead>{t('columnRequested')}</TableHead>
          <TableHead className='pr-6 text-right'>{t('columnActions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partnerships.map((p) => {
          const busy = pendingActionId === p.documentId;
          return (
            <TableRow key={p.documentId}>
              <TableCell className='pl-6'>
                <span className='font-medium text-ink-900'>
                  {p.agent?.companyName ?? '—'}
                </span>
                {p.agent?.qeacNumber && (
                  <span className='ml-2 text-xs text-foggy'>{p.agent.qeacNumber}</span>
                )}
                {p.agent?.countryOfOperation && (
                  <span className='block text-xs text-foggy'>
                    {p.agent.countryOfOperation}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <PartnershipStatusBadge status={p.status} />
              </TableCell>
              <TableCell className='text-sm text-foggy'>
                {formatPartnershipDate(p.createdAt, locale)}
              </TableCell>
              <TableCell className='pr-6'>
                <div className='flex justify-end gap-2'>
                  {variant === 'pending' ? (
                    <>
                      <Button
                        size='sm'
                        disabled={busy}
                        onClick={() => onApprove(p.documentId)}
                      >
                        {busy ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          <Check className='h-4 w-4' />
                        )}
                        {t('approve')}
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        disabled={busy}
                        onClick={() => onDeny(p.documentId)}
                      >
                        <X className='h-4 w-4' />
                        {t('deny')}
                      </Button>
                    </>
                  ) : (
                    <Button
                      size='sm'
                      variant='outline'
                      disabled={busy}
                      onClick={() => onRemove(p)}
                    >
                      {t('remove')}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
