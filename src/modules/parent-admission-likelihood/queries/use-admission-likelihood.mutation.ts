'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { privateApi } from '@/lib/axios';
import { admissionLikelihoodResponseSchema } from '@/modules/parent-admission-likelihood/schemas/admission-likelihood.schema';
import type { SchoolLikelihood } from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

interface ComputeVariables {
  studentId: string;
  schoolIds: string[];
}

async function computeAdmissionLikelihood({
  studentId,
  schoolIds,
}: ComputeVariables): Promise<SchoolLikelihood[]> {
  const { data } = await privateApi.post(
    `/api/students/${studentId}/admission-likelihood`,
    { schoolIds },
  );
  return admissionLikelihoodResponseSchema.parse(data).data.schools;
}

export function useAdmissionLikelihood() {
  const t = useTranslations('ParentAdmissionLikelihood');

  return useMutation({
    mutationFn: computeAdmissionLikelihood,
    onError: () => {
      toast.error(t('computeError'));
    },
  });
}
