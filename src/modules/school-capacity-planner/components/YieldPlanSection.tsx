'use client';

import { useTranslations } from 'next-intl';
import { Gauge } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useYieldPlan } from '@/modules/school-capacity-planner/queries/use-yield-plan.query';
import { IntakeYieldCard } from '@/modules/school-capacity-planner/components/IntakeYieldCard';

export function YieldPlanSection() {
  const t = useTranslations('SchoolCapacityPlanner');
  const { data: intakes, isLoading, isError, refetch } = useYieldPlan();

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading
        icon={Gauge}
        title={t('yieldPlanTitle')}
        description={t('yieldPlanDescription')}
      />

      {isLoading && (
        <div className='grid gap-4 lg:grid-cols-2'>
          <Skeleton className='h-72 w-full rounded-xl' />
          <Skeleton className='h-72 w-full rounded-xl' />
        </div>
      )}

      {isError && (
        <ErrorState
          framed
          message={t('yieldPlanError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      )}

      {!isLoading && !isError && (!intakes || intakes.length === 0) && (
        <EmptyState
          framed
          icon={Gauge}
          title={t('yieldPlanEmptyTitle')}
          description={t('yieldPlanEmptyDescription')}
        />
      )}

      {!isLoading && !isError && intakes && intakes.length > 0 && (
        <div className='grid gap-4 lg:grid-cols-2'>
          {intakes.map((intake) => (
            <IntakeYieldCard
              key={`${intake.intakePeriod}__${intake.yearLevel}`}
              intake={intake}
            />
          ))}
        </div>
      )}
    </section>
  );
}
