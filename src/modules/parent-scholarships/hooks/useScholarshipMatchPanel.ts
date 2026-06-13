'use client';

import { useMemo, useState } from 'react';
import { useParentStudents } from '@/modules/students';
import { useScholarshipMatches } from '@/modules/parent-scholarships/queries/use-scholarship-matches.mutation';
import { sortMatches } from '@/modules/parent-scholarships/lib/sort-matches';

export function useScholarshipMatchPanel() {
  const studentsQuery = useParentStudents();
  const mutation = useScholarshipMatches();
  const [studentId, setStudentId] = useState<string | null>(null);

  const students = useMemo(() => studentsQuery.data?.data ?? [], [studentsQuery.data]);

  const matches = useMemo(
    () => (mutation.data ? sortMatches(mutation.data.data) : []),
    [mutation.data],
  );

  const runMatch = () => {
    if (studentId) mutation.mutate(studentId);
  };

  return {
    students,
    studentId,
    setStudentId,
    runMatch,
    matches,
    eligibleCount: mutation.data?.meta.eligibleCount ?? 0,
    evaluatedCount: mutation.data?.meta.evaluatedCount ?? 0,
    hasResult: mutation.isSuccess,
    isMatching: mutation.isPending,
    isStudentsLoading: studentsQuery.isLoading,
    hasStudents: students.length > 0,
  };
}
