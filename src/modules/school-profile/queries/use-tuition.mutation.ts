'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SCHOOL_TUITIONS_QUERY_KEY } from '@/modules/school-profile/queries/use-school-tuitions.query';
import type {
  CreateTuitionPayload,
  UpdateTuitionPayload,
} from '@/modules/school-profile/types/school-profile.types';

export function useCreateTuition() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');
  return useMutation({
    mutationFn: async (payload: CreateTuitionPayload) => {
      await privateApi.post('/api/school-tuitions', { data: payload });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_TUITIONS_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => toast.error(t('saveError')),
  });
}

export function useUpdateTuition() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');
  return useMutation({
    mutationFn: async ({ documentId, annualAmountAud }: UpdateTuitionPayload) => {
      await privateApi.put(`/api/school-tuitions/${documentId}`, {
        data: { annualAmountAud },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_TUITIONS_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => toast.error(t('saveError')),
  });
}

export function useDeleteTuition() {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');
  return useMutation({
    mutationFn: async (documentId: string) => {
      await privateApi.delete(`/api/school-tuitions/${documentId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_TUITIONS_QUERY_KEY });
      toast.success(t('deleteSuccess'));
    },
    onError: () => toast.error(t('saveError')),
  });
}
