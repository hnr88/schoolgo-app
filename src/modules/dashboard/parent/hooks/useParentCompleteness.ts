'use client';

import { useMemo } from 'react';
import { useParentStudents } from '@/modules/students';
import { deriveCompleteness } from '@/modules/dashboard/parent/lib/parent-completeness';
import { PARENT_DASHBOARD_DERIVE_PAGE_SIZE } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import type { ParentCompletenessItem } from '@/modules/dashboard/parent/types/parent-dashboard.types';

interface UseParentCompletenessResult {
  items: ParentCompletenessItem[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useParentCompleteness(): UseParentCompletenessResult {
  const { data, isLoading, isError, refetch } = useParentStudents({
    pageSize: PARENT_DASHBOARD_DERIVE_PAGE_SIZE,
  });

  const items = useMemo(() => deriveCompleteness(data?.data ?? []), [data]);

  return { items, isLoading, isError, refetch: () => refetch() };
}
