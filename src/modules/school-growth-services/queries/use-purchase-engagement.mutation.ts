'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import {
  GROWTH_ENGAGEMENTS_QUERY_KEY,
  GROWTH_SERVICES_QUERY_KEY,
} from '@/modules/school-growth-services/constants/growth-services.constants';
import { purchaseEngagementResponseSchema } from '@/modules/school-growth-services/schemas/growth-services.schema';
import type {
  PurchaseEngagementFormValues,
  PurchaseEngagementResult,
} from '@/modules/school-growth-services/types/growth-services.types';

export function usePurchaseEngagement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      payload: PurchaseEngagementFormValues,
    ): Promise<PurchaseEngagementResult> => {
      const { data } = await privateApi.post<unknown>(
        '/api/school-staffs/me/growth-engagements',
        { data: payload },
      );
      return purchaseEngagementResponseSchema.parse(data).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROWTH_ENGAGEMENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: GROWTH_SERVICES_QUERY_KEY });
    },
  });
}
