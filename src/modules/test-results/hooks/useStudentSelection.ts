'use client';

import { useState } from 'react';
import { useParentStudents } from '@/modules/students';

export function useStudentSelection(initialStudentDocumentId?: string) {
  const [selected, setSelected] = useState(initialStudentDocumentId ?? '');
  const { data, isLoading, isError, refetch } = useParentStudents({ pageSize: 100 });

  const students = data?.data ?? [];

  return {
    selected,
    setSelected,
    students,
    isLoading,
    isError,
    refetch,
  };
}
