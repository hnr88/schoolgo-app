'use client';

import { useQuery } from '@tanstack/react-query';

import { privateApi } from '@/lib/axios';
import { useAuthStore } from '@/modules/auth';
import {
  TRAINING_COURSES_ENDPOINT,
  TRAINING_COURSES_QUERY_KEY,
} from '@/modules/agent-training/constants/agent-training.constants';
import { trainingCoursesResponseSchema } from '@/modules/agent-training/schemas/agent-training.schema';
import type { TrainingCourse } from '@/modules/agent-training/types/agent-training.types';

async function fetchTrainingCourses(): Promise<TrainingCourse[]> {
  const { data } = await privateApi.get(TRAINING_COURSES_ENDPOINT);
  const parsed = trainingCoursesResponseSchema.safeParse(data);
  if (!parsed.success) {
    console.warn('[useTrainingCourses] unexpected response shape', parsed.error.issues);
    return [];
  }
  return parsed.data.data;
}

export function useTrainingCourses() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: TRAINING_COURSES_QUERY_KEY,
    queryFn: fetchTrainingCourses,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });
}
