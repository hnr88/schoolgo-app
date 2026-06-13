'use client';

import { useEffect, useMemo } from 'react';
import {
  PARENT_STUDENTS_MAX_PAGE_SIZE,
  useActiveChildStore,
  useParentStudents,
} from '@/modules/students';
import type { ParentStudent } from '@/modules/students';

interface UseActiveChildResult {
  children: ParentStudent[];
  activeChildId: string | null;
  activeChild: ParentStudent | null;
  isLoading: boolean;
  setActiveChild: (id: string | null) => void;
}

export function useActiveChild(): UseActiveChildResult {
  const { data, isLoading, isSuccess } = useParentStudents({
    pageSize: PARENT_STUDENTS_MAX_PAGE_SIZE,
  });
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const setActiveChild = useActiveChildStore((s) => s.setActiveChild);

  const children = useMemo(() => data?.data ?? [], [data]);
  const activeChild = useMemo(
    () => children.find((child) => child.documentId === activeChildId) ?? null,
    [children, activeChildId],
  );
  const activeChildExists = activeChild !== null;

  useEffect(() => {
    if (!isSuccess || !activeChildId || activeChildExists) return;
    setActiveChild(null);
  }, [isSuccess, activeChildId, activeChildExists, setActiveChild]);

  return { children, activeChildId, activeChild, isLoading, setActiveChild };
}
