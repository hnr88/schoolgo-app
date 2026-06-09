'use client';

import { useQueries } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { fitCheckResultSchema } from '@/modules/parent-fit-report/schemas/fit-check.schema';
import type {
  FitCheckResult,
  FitReportYearLevel,
} from '@/modules/parent-fit-report/types/fit-report.types';

async function fetchFitCheck(
  school: string,
  student: string,
  targetYearLevel: FitReportYearLevel,
): Promise<FitCheckResult> {
  const { data } = await privateApi.get<{ data: unknown }>(
    `/api/schools/${school}/fit-check`,
    { params: { student, targetYearLevel } },
  );
  return fitCheckResultSchema.parse(data.data);
}

export function useFitReportChecks(
  schoolDocumentIds: string[],
  student: string | null,
  targetYearLevel: FitReportYearLevel | null,
) {
  const enabled = Boolean(student && targetYearLevel);

  return useQueries({
    queries: schoolDocumentIds.map((school) => ({
      queryKey: ['parent', 'fit-report', school, student, targetYearLevel],
      enabled,
      staleTime: 60_000,
      retry: false,
      queryFn: () =>
        fetchFitCheck(school, student as string, targetYearLevel as FitReportYearLevel),
    })),
  });
}
