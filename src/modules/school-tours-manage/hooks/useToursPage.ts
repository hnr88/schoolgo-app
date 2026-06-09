'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useMySchoolTours } from '@/modules/school-tours-manage/queries/use-my-school-tours.query';
import { useSchoolStaffMe } from '@/modules/school-tours-manage/queries/use-school-staff-me.query';
import { useDeleteTour } from '@/modules/school-tours-manage/queries/use-delete-tour.mutation';
import type { ManagedTour } from '@/modules/school-tours-manage/types/school-tours-manage.types';

export function useToursPage() {
  const t = useTranslations('SchoolTours');
  const toursQuery = useMySchoolTours();
  const me = useSchoolStaffMe();
  const deleteTour = useDeleteTour();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ManagedTour | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ManagedTour | null>(null);

  const tours = useMemo(() => toursQuery.data ?? [], [toursQuery.data]);
  const isAdmin = me.data?.permissionLevel === 'admin';

  const handleOpenCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (tour: ManagedTour) => {
    setEditTarget(tour);
    setFormOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteTour.mutate(deleteTarget.documentId, {
      onSuccess: () => {
        toast.success(t('deleteSuccess'));
        setDeleteTarget(null);
      },
      onError: (error) => {
        const message = isAxiosError(error)
          ? (error.response?.data?.error?.message as string | undefined)
          : undefined;
        if (message?.includes('active bookings')) {
          toast.error(t('deleteHasBookings'));
        } else {
          toast.error(message ?? t('deleteError'));
        }
        setDeleteTarget(null);
      },
    });
  };

  return {
    tours,
    isAdmin,
    isLoading: toursQuery.isLoading,
    isError: toursQuery.isError,
    refetch: toursQuery.refetch,
    formOpen,
    setFormOpen,
    editTarget,
    deleteTarget,
    setDeleteTarget,
    isDeleting: deleteTour.isPending,
    handleOpenCreate,
    handleOpenEdit,
    handleConfirmDelete,
  };
}
