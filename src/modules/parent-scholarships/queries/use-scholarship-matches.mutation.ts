'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { privateApi } from '@/lib/axios';
import { scholarshipMatchResponseSchema } from '@/modules/parent-scholarships/schemas/scholarship.schema';
import type { ScholarshipMatchResponse } from '@/modules/parent-scholarships/types/scholarship.types';

async function evaluateMatches(studentDocumentId: string): Promise<ScholarshipMatchResponse> {
  const { data } = await privateApi.post<unknown>(
    `/api/students/${studentDocumentId}/scholarship-matches`,
  );
  return scholarshipMatchResponseSchema.parse(data);
}

export function useScholarshipMatches() {
  const t = useTranslations('ParentScholarships');
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (studentDocumentId: string) => evaluateMatches(studentDocumentId),
    onSuccess: (result, studentDocumentId) => {
      qc.setQueryData(['scholarship-matches', studentDocumentId], result);
      toast.success(t('matchSuccessToast', { count: result.meta.eligibleCount }));
    },
    onError: () => {
      toast.error(t('matchErrorToast'));
    },
  });
}
