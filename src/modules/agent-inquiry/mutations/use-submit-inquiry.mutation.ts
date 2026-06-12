'use client';

import { useMutation } from '@tanstack/react-query';

import { privateApi, publicApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import { AGENT_INQUIRIES_ENDPOINT } from '@/modules/agent-inquiry/constants/agent-inquiry.constants';
import type {
  SubmitInquiryPayload,
  SubmitInquiryResponse,
} from '@/modules/agent-inquiry/types/agent-inquiry.types';

export function useSubmitInquiry() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useMutation({
    mutationFn: async (payload: SubmitInquiryPayload) => {
      // Logged-in parents post with their JWT so the backend links `parent`;
      // guests post publicly (the endpoint is auth:false).
      const client = isAuthenticated ? privateApi : publicApi;
      const { data } = await client.post<SubmitInquiryResponse>(
        AGENT_INQUIRIES_ENDPOINT,
        payload,
      );
      return data.data;
    },
  });
}
