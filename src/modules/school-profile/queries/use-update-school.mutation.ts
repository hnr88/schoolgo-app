'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { privateApi } from '@/lib/axios';
import { SCHOOL_PROFILE_QUERY_KEY } from '@/modules/school-profile/queries/use-school.query';
import type { UpdateSchoolPayload } from '@/modules/school-profile/types/school-profile.types';

export function useUpdateSchool(documentId: string | undefined) {
  const qc = useQueryClient();
  const t = useTranslations('SchoolProfile');

  return useMutation({
    mutationFn: async (payload: UpdateSchoolPayload) => {
      if (!documentId) throw new Error('Missing school documentId');
      await privateApi.put(`/api/schools/${documentId}`, { data: payload });
      return payload;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SCHOOL_PROFILE_QUERY_KEY });
      toast.success(t('saveSuccess'));
    },
    onError: () => {
      toast.error(t('saveError'));
    },
  });
}
