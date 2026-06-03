'use client';

import { useParentApplicationCount } from '@/modules/applications';
import { useParentStudents, useActiveChildStore } from '@/modules/students';
import { useBookmarks } from '@/modules/school-search';
import {
  PARENT_APPLICATION_IN_PROGRESS_STATUSES,
  PARENT_APPLICATION_OFFER_STATUSES,
} from '@/modules/dashboard/parent/constants/parent-dashboard.constants';
import type {
  ParentStatCounts,
  ParentStatTileKey,
} from '@/modules/dashboard/parent/types/parent-dashboard.types';

export interface ParentStatTileState {
  count: number;
  isLoading: boolean;
}

export type ParentStatTileStates = Record<ParentStatTileKey, ParentStatTileState>;

export function useParentStatCounts(): ParentStatTileStates {
  const activeChildId = useActiveChildStore((s) => s.activeChildId);
  const inProgress = useParentApplicationCount({
    statuses: PARENT_APPLICATION_IN_PROGRESS_STATUSES,
    queryKey: 'in-progress',
    student: activeChildId ?? undefined,
  });
  const offers = useParentApplicationCount({
    statuses: PARENT_APPLICATION_OFFER_STATUSES,
    queryKey: 'offers',
    student: activeChildId ?? undefined,
  });
  const students = useParentStudents({ pageSize: 1 });
  const bookmarks = useBookmarks();

  const counts: ParentStatCounts = {
    applicationsInProgress: inProgress.data ?? 0,
    children: students.data?.meta?.pagination?.total ?? 0,
    savedSchools: bookmarks.data?.data?.length ?? 0,
    offers: offers.data ?? 0,
  };

  return {
    applicationsInProgress: {
      count: counts.applicationsInProgress,
      isLoading: inProgress.isLoading,
    },
    children: { count: counts.children, isLoading: students.isLoading },
    savedSchools: { count: counts.savedSchools, isLoading: bookmarks.isLoading },
    offers: { count: counts.offers, isLoading: offers.isLoading },
  };
}
