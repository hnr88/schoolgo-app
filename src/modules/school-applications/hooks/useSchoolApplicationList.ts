'use client';

import { useMemo, useState } from 'react';
import { useSchoolApplications } from '@/modules/school-applications/queries/use-school-applications.query';
import type { SchoolApplicationListItem } from '@/modules/school-applications/types/school-applications.types';

export function useSchoolApplicationList() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [intake, setIntake] = useState('all');

  const statusFilter = status === 'all' ? undefined : status;

  const { data, isLoading, isError, refetch } = useSchoolApplications({
    status: statusFilter,
    intake: intake === 'all' ? undefined : intake,
  });

  // Source the intake options from the status-filtered set without the intake
  // filter applied, so selecting an intake never collapses the option list.
  const { data: intakeOptionsData } = useSchoolApplications({ status: statusFilter });
  const intakes = useMemo<string[]>(() => {
    const set = new Set<string>();
    for (const app of intakeOptionsData ?? []) {
      if (app.targetIntake) set.add(app.targetIntake);
    }
    return Array.from(set).sort();
  }, [intakeOptionsData]);

  const applications = useMemo<SchoolApplicationListItem[]>(() => {
    const items = data ?? [];
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((app) => {
      const studentName = app.student?.name?.toLowerCase() ?? '';
      const agentName = (app.agent?.name ?? app.agent?.companyName ?? '').toLowerCase();
      return studentName.includes(term) || agentName.includes(term);
    });
  }, [data, search]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    intake,
    setIntake,
    intakes,
    applications,
    isLoading,
    isError,
    refetch,
  };
}
