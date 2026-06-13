'use client';

import { useMemo, useState } from 'react';

import { useTrainingCourses } from '@/modules/agent-training/queries/use-training-courses.query';
import { useCertifications } from '@/modules/agent-training/queries/use-certifications.query';
import {
  computeTier,
  countActiveCertifications,
} from '@/modules/agent-training/lib/training-tier';

/**
 * Orchestrates the training dashboard: catalog + certifications reads, derived
 * tier badge, and which course is open in the detail dialog.
 */
export function useAgentTraining() {
  const coursesQuery = useTrainingCourses();
  const certificationsQuery = useCertifications();
  const [openCourseId, setOpenCourseId] = useState<string | null>(null);

  const certificationsData = certificationsQuery.data;
  const certifications = useMemo(() => certificationsData ?? [], [certificationsData]);

  const tier = useMemo(() => computeTier(certifications), [certifications]);
  const activeCount = useMemo(
    () => countActiveCertifications(certifications),
    [certifications],
  );

  return {
    courses: coursesQuery.data ?? [],
    certifications,
    tier,
    activeCount,
    isLoading: coursesQuery.isLoading || certificationsQuery.isLoading,
    isError: coursesQuery.isError || certificationsQuery.isError,
    openCourseId,
    openCourse: setOpenCourseId,
    closeCourse: () => setOpenCourseId(null),
    retry: () => {
      void coursesQuery.refetch();
      void certificationsQuery.refetch();
    },
  };
}
