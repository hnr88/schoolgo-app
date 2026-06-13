'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { privateApi } from '@/lib/axios';
import {
  AGENT_CERTIFICATIONS_QUERY_KEY,
  assessmentSubmitEndpoint,
} from '@/modules/agent-training/constants/agent-training.constants';
import { assessmentResultResponseSchema } from '@/modules/agent-training/schemas/agent-training.schema';
import type {
  AssessmentResult,
  SubmitAssessmentPayload,
} from '@/modules/agent-training/types/agent-training.types';

export function useSubmitAssessment() {
  const queryClient = useQueryClient();
  const t = useTranslations('AgentTraining');

  return useMutation({
    mutationFn: async ({
      documentId,
      answers,
    }: SubmitAssessmentPayload): Promise<AssessmentResult> => {
      const { data } = await privateApi.post(assessmentSubmitEndpoint(documentId), {
        answers,
      });
      return assessmentResultResponseSchema.parse(data).data;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: AGENT_CERTIFICATIONS_QUERY_KEY });
      if (result.passed) {
        toast.success(t('submitPassedToast'));
      } else {
        toast.info(t('submitFailedToast'));
      }
    },
    onError: () => {
      toast.error(t('submitError'));
    },
  });
}
