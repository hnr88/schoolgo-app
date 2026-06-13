'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/axios';
import { schoolQuestionsResponseSchema } from '@/modules/parent-ask-school/schemas/ask-school.schema';
import { PUBLIC_SCHOOL_QUESTIONS_QUERY_KEY } from '@/modules/parent-ask-school/constants/ask-school.constants';
import type { SchoolQuestion } from '@/modules/parent-ask-school/types/ask-school.types';

async function fetchPublicSchoolQuestions(schoolDocumentId: string): Promise<SchoolQuestion[]> {
  const { data } = await publicApi.get(`/api/schools/${schoolDocumentId}/questions`, {
    params: { status: 'published' },
  });
  return schoolQuestionsResponseSchema.parse(data).data;
}

export function usePublicSchoolQuestions(schoolDocumentId: string | null) {
  return useQuery({
    queryKey: [...PUBLIC_SCHOOL_QUESTIONS_QUERY_KEY, schoolDocumentId],
    queryFn: () => fetchPublicSchoolQuestions(schoolDocumentId as string),
    enabled: Boolean(schoolDocumentId),
    staleTime: 60_000,
  });
}
