'use client';

import { useMemo } from 'react';
import { useParentApplications } from '@/modules/applications';
import { useActiveChildStore } from '@/modules/students';
import { PARENT_DASHBOARD_DERIVE_PAGE_SIZE } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import { deriveActionItems } from '@/modules/dashboard/parent/lib/parent-actions';
import { derivePipeline } from '@/modules/dashboard/parent/lib/parent-pipeline';
import { deriveTimeline } from '@/modules/dashboard/parent/lib/parent-timeline';
import { deriveUpcoming } from '@/modules/dashboard/parent/lib/parent-upcoming';
import type {
  ParentActionItem,
  ParentPipelineData,
  ParentTimelineItem,
  ParentUpcomingItem,
} from '@/modules/dashboard/parent/types/parent-dashboard.types';

interface UseParentDerivedApplicationsResult {
  pipeline: ParentPipelineData;
  timeline: ParentTimelineItem[];
  actionItems: ParentActionItem[];
  upcoming: ParentUpcomingItem[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

/** Single applications fetch fanned out into pipeline / timeline / action / upcoming views. */
export function useParentDerivedApplications(): UseParentDerivedApplicationsResult {
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const { data, isLoading, isError, refetch } = useParentApplications({
    pageSize: PARENT_DASHBOARD_DERIVE_PAGE_SIZE,
    student: activeChildId ?? undefined,
  });

  const applications = useMemo(() => data?.data ?? [], [data]);

  const pipeline = useMemo(() => derivePipeline(applications), [applications]);
  const timeline = useMemo(() => deriveTimeline(applications), [applications]);
  const actionItems = useMemo(() => deriveActionItems(applications), [applications]);
  const upcoming = useMemo(() => deriveUpcoming(applications), [applications]);

  return {
    pipeline,
    timeline,
    actionItems,
    upcoming,
    isLoading,
    isError,
    refetch: () => refetch(),
  };
}
