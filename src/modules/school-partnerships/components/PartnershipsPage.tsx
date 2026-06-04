'use client';

import { useTranslations } from 'next-intl';
import { Handshake, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SectionHeading, SurfaceCard } from '@/modules/core';
import { PartnershipTable } from '@/modules/school-partnerships/components/PartnershipTable';
import { AddAgentDialog } from '@/modules/school-partnerships/components/AddAgentDialog';
import { RemovePartnershipDialog } from '@/modules/school-partnerships/components/RemovePartnershipDialog';
import { usePartnershipsPage } from '@/modules/school-partnerships/hooks/usePartnershipsPage';

export function PartnershipsPage() {
  const t = useTranslations('SchoolPartnerships');
  const page = usePartnershipsPage();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={Handshake}
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button onClick={() => page.setAddOpen(true)}>
            <Plus className='h-4 w-4' />
            {t('inviteAgent')}
          </Button>
        }
      />

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
      ) : page.active.length === 0 && page.pending.length === 0 ? (
        <EmptyState framed icon={Handshake} title={t('empty')} description={t('emptyHint')} />
      ) : (
        <div className='flex flex-col gap-8'>
          {page.pending.length > 0 && (
            <section className='flex flex-col gap-3'>
              <SectionHeading level={3} title={t('statusPending')} />
              <SurfaceCard elevation='raised' padding='none' className='overflow-hidden'>
                <PartnershipTable
                  partnerships={page.pending}
                  variant='pending'
                  pendingActionId={page.pendingActionId}
                  onApprove={page.handleApprove}
                  onDeny={page.handleDeny}
                  onRemove={page.setRemoveTarget}
                />
              </SurfaceCard>
            </section>
          )}

          <section className='flex flex-col gap-3'>
            <SectionHeading level={3} title={t('statusApproved')} />
            {page.active.length === 0 ? (
              <EmptyState framed icon={Handshake} title={t('empty')} description={t('emptyHint')} />
            ) : (
              <SurfaceCard elevation='raised' padding='none' className='overflow-hidden'>
                <PartnershipTable
                  partnerships={page.active}
                  variant='active'
                  pendingActionId={page.pendingActionId}
                  onApprove={page.handleApprove}
                  onDeny={page.handleDeny}
                  onRemove={page.setRemoveTarget}
                />
              </SurfaceCard>
            )}
          </section>
        </div>
      )}

      <AddAgentDialog open={page.addOpen} onOpenChange={page.setAddOpen} />
      <RemovePartnershipDialog
        open={page.removeTarget !== null}
        agentName={page.removeTarget?.agent?.companyName ?? null}
        isPending={page.isRemoving}
        onOpenChange={(open) => !open && page.setRemoveTarget(null)}
        onConfirm={page.handleConfirmRemove}
      />
    </div>
  );
}
