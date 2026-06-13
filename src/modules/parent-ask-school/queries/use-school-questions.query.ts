'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { schoolQuestionsResponseSchema } from '@/modules/parent-ask-school/schemas/ask-school.schema';
import { SCHOOL_QUESTIONS_QUERY_KEY } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { QuestionStatus, SchoolQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

async function fetchSchoolQuestions(status?: QuestionStatus): Promise<SchoolQuestion[]> {
  const { data } = await privateApi.get('/api/school-staffs/me/questions', {
    params: status ? { status } : undefined,
  });
  return schoolQuestionsResponseSchema.parse(data).data;
}

export function useSchoolQuestions(status?: QuestionStatus) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: [...SCHOOL_QUESTIONS_QUERY_KEY, status ?? 'all'],
    queryFn: () => fetchSchoolQuestions(status),
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}
