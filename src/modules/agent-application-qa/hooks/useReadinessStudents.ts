'use client';

import { useMemo } from 'react';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { useSharedWithMe } from '@/modules/agent-shared-students';
import type { ReadinessStudentOption } from '@/modules/agent-application-qa/types/readiness.types';

const STUDENTS_PAGE_SIZE = 100;

// The readiness check accepts any student the agent owns directly OR via an
// active share, so the picker merges both sources and de-duplicates by
// documentId (a directly-owned student is preferred over a shared copy).
export function useReadinessStudents() {
  const ownedQuery = useStudents({ pageSize: STUDENTS_PAGE_SIZE, status: 'active' });
  const sharedQuery = useSharedWithMe();

  const options = useMemo<ReadinessStudentOption[]>(() => {
    const byId = new Map<string, ReadinessStudentOption>();

    for (const student of ownedQuery.data?.data ?? []) {
      byId.set(student.documentId, {
        documentId: student.documentId,
        firstName: student.firstName,
        lastName: student.lastName,
        currentYearLevel: student.currentYearLevel,
      });
    }

    for (const share of sharedQuery.data ?? []) {
      const student = share.student;
      if (share.status !== 'active' || !student || byId.has(student.documentId)) continue;
      byId.set(student.documentId, {
        documentId: student.documentId,
        firstName: student.firstName ?? null,
        lastName: student.lastName ?? null,
        currentYearLevel: student.currentYearLevel ?? null,
      });
    }

    return Array.from(byId.values()).sort((a, b) =>
      `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim().localeCompare(
        `${b.firstName ?? ''} ${b.lastName ?? ''}`.trim(),
      ),
    );
  }, [ownedQuery.data, sharedQuery.data]);

  return {
    options,
    isLoading: ownedQuery.isLoading || sharedQuery.isLoading,
    isError: ownedQuery.isError && sharedQuery.isError,
  };
}
