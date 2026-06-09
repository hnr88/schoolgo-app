'use client';

import { useMemo, useState } from 'react';
import { useParentApplications } from '@/modules/applications/queries/use-parent-applications.query';
import { deriveInterviews } from '@/modules/parent-interviews/lib/derive-interviews';
import type { InterviewBuckets } from '@/modules/parent-interviews/types/parent-interviews.types';

const INTERVIEWS_PAGE_SIZE = 100;

interface UseParentInterviewsResult {
  buckets: InterviewBuckets;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  retry: () => void;
}

export function useParentInterviews(): UseParentInterviewsResult {
  const [now] = useState(() => new Date());
  const { data, isLoading, isError, refetch } = useParentApplications({
    pageSize: INTERVIEWS_PAGE_SIZE,
  });

  const buckets = useMemo(() => {
    return deriveInterviews(data?.data ?? [], now);
  }, [data, now]);

  return {
    buckets,
    isLoading,
    isError,
    isEmpty: buckets.upcoming.length === 0 && buckets.past.length === 0,
    retry: () => {
      void refetch();
    },
  };
}
