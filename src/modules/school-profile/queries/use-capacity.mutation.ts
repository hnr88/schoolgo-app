'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SCHOOL_CAPACITIES_QUERY_KEY } from '@/modules/school-profile/queries/use-school-capacities.query';
import type {
  CreateCapacityPayload,
  UpdateCapacityPayload,
} from '@/modules/school-profile/types/school-profile.types';

export function useCreateCapacity() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');
  return useMutation({
    mutationFn: async (payload: CreateCapacityPayload) => {
      await privateApi.post('/api/school-capacities', { data: payload });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_CAPACITIES_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => toast.error(t('saveError')),
  });
}

export function useUpdateCapacity() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');
  return useMutation({
    mutationFn: async ({ documentId, totalPlaces, autoWaitlist }: UpdateCapacityPayload) => {
      await privateApi.put(`/api/school-capacities/${documentId}`, {
        data: { totalPlaces, autoWaitlist },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_CAPACITIES_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => toast.error(t('saveError')),
  });
}

export function useDeleteCapacity() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');
  return useMutation({
    mutationFn: async (documentId: string) => {
      await privateApi.delete(`/api/school-capacities/${documentId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_CAPACITIES_QUERY_KEY });
      toast.success(t('deleteSuccess'));
    },
    onError: () => toast.error(t('saveError')),
  });
}
