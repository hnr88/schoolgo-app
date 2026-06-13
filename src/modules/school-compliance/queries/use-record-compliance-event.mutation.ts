'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { complianceEventResponseSchema } from '@/modules/school-compliance/schemas/compliance.schema';
import { COE_REGISTER_QUERY_KEY } from '@/modules/school-compliance/queries/use-coe-register.query';
import { WATCHLIST_QUERY_KEY } from '@/modules/school-compliance/queries/use-watchlist.query';
import type {
  ComplianceEvent,
  ComplianceEventFormValues,
} from '@/modules/school-compliance/types/school-compliance.types';

export function useRecordComplianceEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationDocumentId,
      type,
      dueAt,
      note,
    }: ComplianceEventFormValues): Promise<ComplianceEvent> => {
      const payload: Record<string, unknown> = { type };
      if (dueAt?.trim()) payload.dueAt = dueAt;
      if (note?.trim()) payload.note = note;

      const { data } = await privateApi.post(
        `/api/school-staffs/me/applications/${applicationDocumentId}/compliance-event`,
        { data: payload },
      );
      return complianceEventResponseSchema.parse(data).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COE_REGISTER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY });
    },
  });
}
