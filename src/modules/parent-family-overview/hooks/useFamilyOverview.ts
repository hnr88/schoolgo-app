'use client';

import { useMemo } from 'react';
import { useParentApplications } from '@/modules/applications';
import { PARENT_STUDENTS_MAX_PAGE_SIZE, useParentStudents } from '@/modules/students';
import { FAMILY_OVERVIEW_APPLICATIONS_PAGE_SIZE } from '@/modules/parent-family-overview/constants/family-overview.constants';
import { buildFamilyMatrix } from '@/modules/parent-family-overview/lib/build-family-matrix';

export function useFamilyOverview() {
  const studentsQuery = useParentStudents({
    pageSize: PARENT_STUDENTS_MAX_PAGE_SIZE,
    sort: 'firstName:asc',
  });
  const applicationsQuery = useParentApplications({
    pageSize: FAMILY_OVERVIEW_APPLICATIONS_PAGE_SIZE,
    sort: 'createdAt:asc',
  });

  const students = studentsQuery.data?.data;
  const applications = applicationsQuery.data?.data;

  const matrix = useMemo(
    () => buildFamilyMatrix(students ?? [], applications ?? []),
    [students, applications],
  );

  return {
    matrix,
    isLoading: studentsQuery.isLoading || applicationsQuery.isLoading,
    isError: studentsQuery.isError || applicationsQuery.isError,
    hasStudents: (students?.length ?? 0) > 0,
    hasApplications: (applications?.length ?? 0) > 0,
    refetch: () => {
      void studentsQuery.refetch();
      void applicationsQuery.refetch();
    },
  };
}
