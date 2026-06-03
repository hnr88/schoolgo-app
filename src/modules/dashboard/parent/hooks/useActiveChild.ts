'use client';

import { useEffect, useMemo } from 'react';
import { useActiveChildStore, useParentStudents } from '@/modules/students';
import type { ParentStudent } from '@/modules/students';

interface UseActiveChildResult {
  children: ParentStudent[];
  activeChildId: string | null;
  activeChild: ParentStudent | null;
  isLoading: boolean;
  setActiveChild: (id: string | null) => void;
}

export function useActiveChild(): UseActiveChildResult {
  const { data, isLoading } = useParentStudents();
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const setActiveChild = useActiveChildStore((s) => s.setActiveChild);

  const children = useMemo(() => data?.data ?? [], [data]);
  const activeChild = children.find((child) => child.documentId === activeChildId) ?? null;

  useEffect(() => {
    if (isLoading || !activeChildId) return;
    const exists = children.some((child) => child.documentId === activeChildId);
    if (!exists) setActiveChild(null);
  }, [isLoading, activeChildId, children, setActiveChild]);

  return { children, activeChildId, activeChild, isLoading, setActiveChild };
}
