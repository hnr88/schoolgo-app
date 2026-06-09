'use client';

import { useTranslations } from 'next-intl';
import { CalendarDays, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, SectionHeading, SurfaceCard } from '@/modules/core';
import { ToursTable } from '@/modules/school-tours-manage/components/ToursTable';
import { TourFormDialog } from '@/modules/school-tours-manage/components/TourFormDialog';
import { DeleteTourDialog } from '@/modules/school-tours-manage/components/DeleteTourDialog';
import { useToursPage } from '@/modules/school-tours-manage/hooks/useToursPage';

export function SchoolToursManagePage() {
  const t = useTranslations('SchoolTours');
  const page = useToursPage();

  return (
    <div className='flex flex-col gap-6'>
      <SectionHeading
        level={1}
        icon={CalendarDays}
        title={t('title')}
        description={t('subtitle')}
        actions={
          page.isAdmin ? (
            <Button onClick={page.handleOpenCreate} data-testid='new-tour-trigger'>
              <Plus className='h-4 w-4' />
              {t('newTour')}
            </Button>
          ) : undefined
        }
      />

      {!page.isLoading && !page.isError && !page.isAdmin && (
        <p className='text-sm text-foggy'>{t('adminOnly')}</p>
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
      ) : page.tours.length === 0 ? (
        <EmptyState framed icon={CalendarDays} title={t('empty')} />
      ) : (
        <SurfaceCard elevation='raised' padding='none' className='overflow-hidden'>
          <ToursTable
            tours={page.tours}
            isAdmin={page.isAdmin}
            onEdit={page.handleOpenEdit}
            onDelete={page.setDeleteTarget}
          />
        </SurfaceCard>
      )}

      <TourFormDialog open={page.formOpen} onOpenChange={page.setFormOpen} tour={page.editTarget} />
      <DeleteTourDialog
        open={page.deleteTarget !== null}
        tourTitle={page.deleteTarget?.title ?? null}
        isPending={page.isDeleting}
        onOpenChange={(open) => !open && page.setDeleteTarget(null)}
        onConfirm={page.handleConfirmDelete}
      />
    </div>
  );
}
