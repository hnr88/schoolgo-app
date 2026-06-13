'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import {
  trainingCourseEndpoint,
  trainingCourseQueryKey,
} from '@/modules/agent-training/constants/agent-training.constants';
import { trainingCourseDetailResponseSchema } from '@/modules/agent-training/schemas/agent-training.schema';
import type { TrainingCourseDetail } from '@/modules/agent-training/types/agent-training.types';

async function fetchTrainingCourse(documentId: string): Promise<TrainingCourseDetail> {
  const { data } = await privateApi.get(trainingCourseEndpoint(documentId));
  return trainingCourseDetailResponseSchema.parse(data).data;
}

export function useTrainingCourse(documentId: string | null) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: trainingCourseQueryKey(documentId ?? 'none'),
    queryFn: () => fetchTrainingCourse(documentId as string),
    enabled: isAuthenticated && Boolean(documentId),
    staleTime: 60_000,
  });
}
