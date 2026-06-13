'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ListOrdered } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, SectionHeading } from '@/modules/core';
import { useWaitlist } from '@/modules/school-capacity-planner/queries/use-waitlist.query';
import { useWaitlistReorder } from '@/modules/school-capacity-planner/hooks/useWaitlistReorder';
import { groupWaitlistByScope } from '@/modules/school-capacity-planner/lib/format';
import { AddWaitlistDialog } from '@/modules/school-capacity-planner/components/AddWaitlistDialog';
import { PromoteWaitlistDialog } from '@/modules/school-capacity-planner/components/PromoteWaitlistDialog';
import { WaitlistScopeGroup } from '@/modules/school-capacity-planner/components/WaitlistScopeGroup';
import type { WaitlistEntry } from '@/modules/school-capacity-planner/types/capacity-planner.types';

export function WaitlistSection() {
  const t = useTranslations('SchoolCapacityPlanner');
  const { data: entries, isLoading, isError, refetch } = useWaitlist();
  const { move, isReordering } = useWaitlistReorder(entries ?? []);
  const [promoting, setPromoting] = useState<WaitlistEntry | null>(null);

  const hasEntries = entries && entries.length > 0;

  return (
    <section className='flex flex-col gap-4'>
      <SectionHeading
        icon={ListOrdered}
        title={t('waitlistTitle')}
        description={t('waitlistDescription')}
        actions={<AddWaitlistDialog />}
      />

      {isLoading && (
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-40 w-full rounded-xl' />
          <Skeleton className='h-40 w-full rounded-xl' />
        </div>
      )}

      {isError && (
        <ErrorState
          framed
          message={t('waitlistError')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
        />
      )}

      {!isLoading && !isError && !hasEntries && (
        <EmptyState
          framed
          icon={ListOrdered}
          title={t('waitlistEmptyTitle')}
          description={t('waitlistEmptyDescription')}
        />
      )}

      {!isLoading && !isError && hasEntries && (
        <div className='flex flex-col gap-4'>
          {groupWaitlistByScope(entries).map((group) => (
            <WaitlistScopeGroup
              key={group.key}
              intakePeriod={group.intakePeriod}
              yearLevel={group.yearLevel}
              entries={group.entries}
              isBusy={isReordering}
              onMove={move}
              onPromote={setPromoting}
            />
          ))}
        </div>
      )}

      <PromoteWaitlistDialog entry={promoting} onClose={() => setPromoting(null)} />
    </section>
  );
}
