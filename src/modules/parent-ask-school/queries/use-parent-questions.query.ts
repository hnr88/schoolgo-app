'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { parentQuestionsResponseSchema } from '@/modules/parent-ask-school/schemas/ask-school.schema';
import { PARENT_QUESTIONS_QUERY_KEY } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { ParentQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

async function fetchParentQuestions(): Promise<ParentQuestion[]> {
  const { data } = await privateApi.get('/api/parents/me/questions');
  return parentQuestionsResponseSchema.parse(data).data;
}

export function useParentQuestions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: PARENT_QUESTIONS_QUERY_KEY,
    queryFn: fetchParentQuestions,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}
