'use client';

import { useTranslations } from 'next-intl';
import { Plus, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SectionHeading, SurfaceCard } from '@/modules/core';
import { StaffTable } from '@/modules/school-staff/components/StaffTable';
import { InviteStaffDialog } from '@/modules/school-staff/components/InviteStaffDialog';
import { DeactivateStaffDialog } from '@/modules/school-staff/components/DeactivateStaffDialog';
import { useStaffPage } from '@/modules/school-staff/hooks/useStaffPage';

export function StaffPage() {
  const t = useTranslations('SchoolStaff');
  const page = useStaffPage();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={Users}
        title={t('title')}
        description={t('subtitle')}
        actions={
          page.isAdmin ? (
            <Button onClick={() => page.setInviteOpen(true)} data-testid='invite-staff-trigger'>
              <Plus className='h-4 w-4' />
              {t('inviteStaff')}
            </Button>
          ) : undefined
        }
      />

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
          framed
          icon={RefreshCw}
          title={t('loadError')}
          action={
            <Button variant='outline' onClick={() => page.refetch()}>
              {t('retry')}
            </Button>
          }
        />
      ) : page.members.length === 0 ? (
        <EmptyState framed icon={Users} title={t('empty')} />
      ) : (
        <SurfaceCard elevation='raised' padding='none' className='overflow-hidden'>
          <StaffTable
            members={page.members}
            currentStaffDocumentId={page.currentStaffDocumentId}
            isAdmin={page.isAdmin}
            pendingActionId={page.pendingActionId}
            onPromote={page.handlePromote}
            onDeactivate={page.setDeactivateTarget}
          />
        </SurfaceCard>
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
