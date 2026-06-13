'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import {
  applicantFitConfigResponseSchema,
} from '@/modules/school-applicant-fit/schemas/applicant-fit.schema';
import {
  APPLICANT_FIT_QUERY_KEY,
} from '@/modules/school-applicant-fit/queries/use-applicant-fit.query';
import { FIT_CONFIG_QUERY_KEY } from '@/modules/school-applicant-fit/queries/use-fit-config.query';
import type {
  ApplicantFitConfig,
  UpdateFitConfigInput,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

async function updateFitConfig(input: UpdateFitConfigInput): Promise<ApplicantFitConfig> {
  const { data } = await privateApi.put('/api/school-staffs/me/applicant-fit-config', {
    data: { weights: input.weights, thresholds: input.thresholds },
  });
  return applicantFitConfigResponseSchema.parse(data).data;
}

export function useUpdateFitConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFitConfig,
    onSuccess: (config) => {
      queryClient.setQueryData(FIT_CONFIG_QUERY_KEY, config);
      void queryClient.invalidateQueries({ queryKey: APPLICANT_FIT_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: ['school', 'applicant-fit', 'breakdown'] });
    },
  });
}
