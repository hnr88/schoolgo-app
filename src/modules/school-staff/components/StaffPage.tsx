'use client';

import { useTranslations } from 'next-intl';
import { Plus, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { StaffTable } from '@/modules/school-staff/components/StaffTable';
import { InviteStaffDialog } from '@/modules/school-staff/components/InviteStaffDialog';
import { DeactivateStaffDialog } from '@/modules/school-staff/components/DeactivateStaffDialog';
import { useStaffPage } from '@/modules/school-staff/hooks/useStaffPage';

export function StaffPage() {
  const t = useTranslations('SchoolStaff');
  const page = useStaffPage();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-ink-900'>{t('title')}</h1>
          <p className='mt-1 text-sm text-foggy'>{t('subtitle')}</p>
        </div>
        {page.isAdmin && (
          <Button onClick={() => page.setInviteOpen(true)} data-testid='invite-staff-trigger'>
            <Plus className='h-4 w-4' />
            {t('inviteStaff')}
          </Button>
        )}
      </div>

      {!page.isLoading && !page.isError && !page.isAdmin && (
        <p className='text-sm text-foggy' data-testid='staff-admin-only-note'>
          {t('adminOnly')}
        </p>
      )}

      {page.isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-12 w-full rounded-lg' />
          <Skeleton className='h-12 w-full rounded-lg' />
        </div>
      ) : page.isError ? (
        <EmptyState
          icon={RefreshCw}
          title={t('loadError')}
          action={
            <Button variant='outline' onClick={() => page.refetch()}>
              {t('retry')}
            </Button>
          }
        />
      ) : page.members.length === 0 ? (
        <EmptyState icon={Users} title={t('empty')} />
      ) : (
        <Card className='overflow-hidden p-0'>
          <StaffTable
            members={page.members}
            currentStaffDocumentId={page.currentStaffDocumentId}
            isAdmin={page.isAdmin}
            pendingActionId={page.pendingActionId}
            onPromote={page.handlePromote}
            onDeactivate={page.setDeactivateTarget}
          />
        </Card>
      )}

      <InviteStaffDialog
        open={page.inviteOpen}
        onOpenChange={page.setInviteOpen}
        schoolDocumentId={page.schoolDocumentId}
      />
      <DeactivateStaffDialog
        open={page.deactivateTarget !== null}
        staffName={page.deactivateTarget?.fullName ?? null}
        isPending={page.isDeactivating}
        onOpenChange={(open) => !open && page.setDeactivateTarget(null)}
        onConfirm={page.handleConfirmDeactivate}
      />
    </div>
  );
}
