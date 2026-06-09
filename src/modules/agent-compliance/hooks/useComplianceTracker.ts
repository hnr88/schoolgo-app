'use client';

import { useMemo, useState } from 'react';
import { useAgentDocuments } from '@/modules/agent-documents';
import { useStudents } from '@/modules/students';
import {
  buildComplianceRows,
  summarizeCompliance,
} from '@/modules/agent-compliance/lib/build-compliance-rows';

const COMPLIANCE_PAGE_SIZE = 100;

export function useComplianceTracker() {
  const [now] = useState(() => new Date());
  const students = useStudents({ pageSize: COMPLIANCE_PAGE_SIZE, sort: 'firstName:asc' });
  const documents = useAgentDocuments({ status: 'active' });

  const rows = useMemo(() => {
    const tracked = (students.data?.data ?? []).filter((student) => student.status !== 'archived');
    return buildComplianceRows(tracked, documents.data?.data ?? [], now);
  }, [students.data, documents.data, now]);

  const summary = useMemo(() => summarizeCompliance(rows), [rows]);

  const isLoading = students.isLoading || documents.isLoading;
  const isError = students.isError || documents.isError;

  return {
    rows,
    summary,
    isLoading,
    isError,
    isEmpty: !isLoading && !isError && rows.length === 0,
    retry: () => {
      void students.refetch();
      void documents.refetch();
    },
  };
}
