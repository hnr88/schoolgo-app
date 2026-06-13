'use client';

import { useMutation } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { readinessCheckResponseSchema } from '@/modules/agent-application-qa/schemas/readiness.schema';
import type {
  ReadinessCheckRequest,
  ReadinessCheckResponse,
} from '@/modules/agent-application-qa/types/readiness.types';

async function runReadinessCheck({
  studentDocumentId,
  schoolIds,
}: ReadinessCheckRequest): Promise<ReadinessCheckResponse['data']> {
  const { data } = await privateApi.post(
    `/api/students/${studentDocumentId}/readiness-check`,
    { schoolIds },
  );
  return readinessCheckResponseSchema.parse(data).data;
}

export function useReadinessCheck() {
  return useMutation({
    mutationKey: ['agent', 'application-qa', 'readiness-check'],
    mutationFn: runReadinessCheck,
  });
}
