'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import { issueMagicLinkInputSchema } from '@/modules/test-results/schemas/issue-magic-link.schema';
import type {
  IssueMagicLinkError,
  IssueMagicLinkInput,
  IssueMagicLinkResult,
} from '@/modules/test-results/types/issue-magic-link.types';

function toIssueMagicLinkError(error: unknown): IssueMagicLinkError {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      (error.response?.data as { error?: { message?: string } } | undefined)?.error?.message ??
      error.message;

    if (status === 400) return { kind: 'validation', message };
    if (status === 401) return { kind: 'unauthorized', message };
    if (status === 403) return { kind: 'forbidden', message };
    if (status === 404) return { kind: 'notFound', message };
    if (status === 429) return { kind: 'rateLimited', message };
    return { kind: 'unknown', message };
  }

  return { kind: 'unknown', message: error instanceof Error ? error.message : 'Request failed' };
}

export function useIssueMagicLink() {
  const queryClient = useQueryClient();

  return useMutation<IssueMagicLinkResult, IssueMagicLinkError, IssueMagicLinkInput>({
    mutationFn: async (input) => {
      const parsed = issueMagicLinkInputSchema.safeParse(input);
      if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? 'Invalid request';
        throw { kind: 'validation', message } satisfies IssueMagicLinkError;
      }

      const { documentId, testDocumentId, ttlMinutes } = parsed.data;

      try {
        const payload: { testDocumentId?: string; ttlMinutes?: number } = {};
        if (testDocumentId) payload.testDocumentId = testDocumentId;
        if (ttlMinutes !== undefined) payload.ttlMinutes = ttlMinutes;

        const { data } = await privateApi.post<IssueMagicLinkResult>(
          `/api/students/${documentId}/magic-link`,
          Object.keys(payload).length > 0 ? { data: payload } : {},
        );
        return data;
      } catch (error) {
        throw toIssueMagicLinkError(error);
      }
    },
    onSuccess: (_result, { documentId }) => {
      void queryClient.invalidateQueries({ queryKey: ['parent', 'test-results', documentId] });
    },
  });
}
