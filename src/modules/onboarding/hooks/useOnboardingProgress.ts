'use client';

import { useParentApplicationCount } from '@/modules/applications';
import { useParentStudents } from '@/modules/students';
import { useBookmarks } from '@/modules/school-search';
import { useMe } from '@/modules/parent-settings/queries/use-me.query';
import { ALL_APPLICATION_STATUSES } from '@/modules/onboarding/constants/onboarding.constants';
import { computeCompleteness } from '@/modules/onboarding/lib/compute-completeness';
import type { OnboardingProgress } from '@/modules/onboarding/types/onboarding.types';

interface UseOnboardingProgressResult {
  progress: OnboardingProgress;
  isLoading: boolean;
}

export function useOnboardingProgress(): UseOnboardingProgressResult {
  const me = useMe();
  const students = useParentStudents({ pageSize: 1 });
  const bookmarks = useBookmarks();
  const applications = useParentApplicationCount({
    statuses: ALL_APPLICATION_STATUSES,
    queryKey: 'onboarding-all',
  });

  const isLoading =
    me.isLoading || students.isLoading || bookmarks.isLoading || applications.isLoading;

  const progress = computeCompleteness({
    hasProfile: Boolean(me.data?.phone),
    hasChild: (students.data?.meta?.pagination?.total ?? 0) > 0,
    hasSavedSchool: (bookmarks.data?.data?.length ?? 0) > 0,
    hasApplication: (applications.data ?? 0) > 0,
  });

  return { progress, isLoading };
}
