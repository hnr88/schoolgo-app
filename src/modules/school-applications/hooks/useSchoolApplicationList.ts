'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMyAssignedApplications } from '@/modules/school-applications/queries/use-my-assigned-applications.query';
import { useSchoolApplications } from '@/modules/school-applications/queries/use-school-applications.query';
import { SCHOOL_STATUS_LABEL_KEY } from '@/modules/school-applications/lib/school-application';
import type {
  SchoolApplicationListItem,
  SchoolApplicationStatus,
} from '@/modules/school-applications/types/school-applications.types';

function initialStatusFromUrl(value: string | null): string {
  if (!value) return 'all';
  return value in SCHOOL_STATUS_LABEL_KEY ? (value as SchoolApplicationStatus) : 'all';
}

export function useSchoolApplicationList() {
  const searchParams = useSearchParams();

  // The dashboard KPI tiles deep-link here as /dashboard/applications?status=...
  // so the list must seed its filters from the URL — otherwise the deep-link
  // navigates but the status filter never applies.
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(() => initialStatusFromUrl(searchParams.get('status')));
  const [intake, setIntake] = useState(() => searchParams.get('intake') ?? 'all');
  const [view, setView] = useState<'all' | 'mine'>(() =>
    searchParams.get('view') === 'mine' ? 'mine' : 'all',
  );

  const statusFilter = status === 'all' ? undefined : status;
  const intakeFilter = intake === 'all' ? undefined : intake;

  const allQuery = useSchoolApplications({ status: statusFilter, intake: intakeFilter });
  const mineQuery = useMyAssignedApplications({
    status: statusFilter,
    intake: intakeFilter,
    enabled: view === 'mine',
  });
  const { data, isLoading, isError, refetch } = view === 'mine' ? mineQuery : allQuery;

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
    view,
    setView,
    intakes,
    applications,
    isLoading,
    isError,
    refetch,
  };
}
