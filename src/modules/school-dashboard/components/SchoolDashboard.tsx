'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { PageHeader } from '@/modules/dashboard';
import { getTimeOfDay } from '@/modules/dashboard/lib/get-time-of-day';
import { SchoolActionBanner } from '@/modules/school-dashboard/components/SchoolActionBanner';
import { SchoolActivityFeed } from '@/modules/school-dashboard/components/SchoolActivityFeed';
import { SchoolExpiringOffers } from '@/modules/school-dashboard/components/SchoolExpiringOffers';
import { SchoolKpiCards } from '@/modules/school-dashboard/components/SchoolKpiCards';
import { SchoolOnboardingChecklist } from '@/modules/school-dashboard/components/SchoolOnboardingChecklist';
import { SchoolQuickActions } from '@/modules/school-dashboard/components/SchoolQuickActions';
import {
  countCompletedSteps,
  isOnboardingComplete,
  mapActivityRows,
  mapOnboardingSteps,
  mapStatCards,
  staffDisplayName,
} from '@/modules/school-dashboard/lib/school-dashboard.lib';
import { useSchoolDashboard } from '@/modules/school-dashboard/queries/use-school-dashboard.query';
import { useSchoolOnboarding } from '@/modules/school-dashboard/queries/use-school-onboarding.query';
import { useSchoolStaffMe } from '@/modules/school-dashboard/queries/use-school-staff-me.query';

function DashboardSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      <Skeleton className='h-20 w-full rounded-lg' />
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-28 w-full rounded-lg' />
        ))}
      </div>
      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <Skeleton className='h-80 w-full rounded-lg' />
        <Skeleton className='h-80 w-full rounded-lg' />
      </div>
    </div>
  );
}

export function SchoolDashboard() {
  const t = useTranslations('SchoolDashboard');
  const locale = useLocale();
  const staff = useSchoolStaffMe();
  const dashboard = useSchoolDashboard();
  const onboarding = useSchoolOnboarding();

  const isLoading = staff.isLoading || dashboard.isLoading || onboarding.isLoading;
  const isError = staff.isError || dashboard.isError || onboarding.isError;

  if (isLoading) return <DashboardSkeleton />;

  if (isError || !staff.data || !dashboard.data || !onboarding.data) {
    return (
      <ErrorState
        framed
        message={t('loadError')}
        onRetry={() => {
          void staff.refetch();
          void dashboard.refetch();
          void onboarding.refetch();
        }}
        retryLabel={t('retry')}
      />
    );
  }

  const greetingKey = {
    morning: 'greetingMorning',
    afternoon: 'greetingAfternoon',
    evening: 'greetingEvening',
  }[getTimeOfDay()];

  const name = staffDisplayName(
    staff.data.user?.firstName,
    staff.data.user?.lastName,
    staff.data.school.name,
  );
  const cards = mapStatCards(dashboard.data.summary);
  const activity = mapActivityRows(dashboard.data.activityFeed, locale);
  const steps = mapOnboardingSteps(onboarding.data);
  const onboardingDone = isOnboardingComplete(onboarding.data);

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader title={`${t(greetingKey)}, ${name}`} description={t('subtitle')} />

      {!onboardingDone && (
        <SchoolOnboardingChecklist
          steps={steps}
          completed={countCompletedSteps(steps)}
        />
      )}

      <SchoolActionBanner actionRequired={dashboard.data.actionRequired} />
      <SchoolKpiCards cards={cards} />

      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <SchoolActivityFeed events={activity} />
        <SchoolExpiringOffers offers={dashboard.data.expiringOffers} />
      </div>

      <SchoolQuickActions />
    </div>
  );
}
