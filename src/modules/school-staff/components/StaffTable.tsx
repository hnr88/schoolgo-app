'use client';

import { useTranslations } from 'next-intl';
import { Loader2, ShieldCheck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StaffStatusBadge } from '@/modules/school-staff/components/StaffStatusBadge';
import type { StaffTableProps } from '@/modules/school-staff/types/component.types';

export function StaffTable({
  members,
  currentStaffDocumentId,
  isAdmin,
  pendingActionId,
  onPromote,
  onDeactivate,
}: StaffTableProps) {
  const t = useTranslations('SchoolStaff');

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-divider hover:bg-transparent'>
          <TableHead className='pl-5 text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnName')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnEmail')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnRole')}</TableHead>
          <TableHead className='text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnStatus')}</TableHead>
          {isAdmin && <TableHead className='pr-5 text-right text-xs font-semibold uppercase tracking-wide text-foggy'>{t('columnActions')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((m) => {
          const busy = pendingActionId === m.documentId;
          const isSelf = m.documentId === currentStaffDocumentId;
          const canPromote = m.permissionLevel === 'staff' && m.status === 'active';
          const canDeactivate = m.status === 'active' && !isSelf;

          return (
            <TableRow key={m.documentId} className='hover:bg-muted' data-testid='staff-row' data-email={m.email}>
              <TableCell className='pl-5 py-3.5'>
                <span className='font-semibold text-ink-900'>{m.fullName || '—'}</span>
                {m.permissionLevel === 'admin' && (
                  <span className='ml-2 inline-flex items-center gap-1 text-xs text-foggy'>
                    <ShieldCheck className='h-3 w-3' />
                    {t('roleAdmin')}
                  </span>
                )}
              </TableCell>
              <TableCell className='py-3.5 text-sm text-foggy'>{m.email || '—'}</TableCell>
              <TableCell className='py-3.5 text-sm text-ink-900'>{m.roleTitle || '—'}</TableCell>
              <TableCell className='py-3.5'>
                <StaffStatusBadge status={m.status} />
              </TableCell>
              {isAdmin && (
                <TableCell className='pr-5 py-3.5'>
                  <div className='flex justify-end gap-2'>
                    {canPromote && (
                      <Button
                        size='sm'
                        variant='outline'
                        disabled={busy}
                        onClick={() => onPromote(m.documentId)}
                      >
                        {busy ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          <ShieldCheck className='h-4 w-4' />
                        )}
                        {t('promote')}
                      </Button>
                    )}
                    {canDeactivate && (
                      <Button
                        size='sm'
                        variant='outline'
                        disabled={busy}
                        onClick={() => onDeactivate(m)}
                      >
                        {t('deactivate')}
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
