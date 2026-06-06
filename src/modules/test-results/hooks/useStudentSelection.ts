'use client';

import { useEffect } from 'react';
import { useActiveChildStore, useParentStudents } from '@/modules/students';

export function useStudentSelection(initialStudentDocumentId?: string) {
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const setActiveChild = useActiveChildStore((s) => s.setActiveChild);
  const { data, isLoading, isError, refetch } = useParentStudents({ pageSize: 100 });

  const students = data?.data ?? [];

  useEffect(() => {
    if (initialStudentDocumentId && initialStudentDocumentId !== activeChildId) {
      setActiveChild(initialStudentDocumentId);
    }
  }, [initialStudentDocumentId, activeChildId, setActiveChild]);

  function setSelected(documentId: string) {
    setActiveChild(documentId === '' ? null : documentId);
  }

  return {
    selected: activeChildId ?? '',
    setSelected,
    students,
    isLoading,
    isError,
    refetch,
  };
}
