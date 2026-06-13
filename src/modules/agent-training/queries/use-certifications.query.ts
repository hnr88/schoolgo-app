'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import {
  AGENT_CERTIFICATIONS_ENDPOINT,
  AGENT_CERTIFICATIONS_QUERY_KEY,
} from '@/modules/agent-training/constants/agent-training.constants';
import { certificationsResponseSchema } from '@/modules/agent-training/schemas/agent-training.schema';
import type { Certification } from '@/modules/agent-training/types/agent-training.types';

async function fetchCertifications(): Promise<Certification[]> {
  const { data } = await privateApi.get(AGENT_CERTIFICATIONS_ENDPOINT);
  const parsed = certificationsResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useCertifications] unexpected response shape', parsed.error.issues);
    return [];
  }
  return parsed.data.data;
}

export function useCertifications() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: AGENT_CERTIFICATIONS_QUERY_KEY,
    queryFn: fetchCertifications,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
