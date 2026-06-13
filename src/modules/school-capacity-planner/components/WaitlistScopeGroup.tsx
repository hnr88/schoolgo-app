import { useTranslations } from 'next-intl';
import { SurfaceCard } from '@/modules/core';
import type { WaitlistEntry } from '@/modules/school-capacity-planner/types/capacity-planner.types';
import { WaitlistRow } from '@/modules/school-capacity-planner/components/WaitlistRow';

interface WaitlistScopeGroupProps {
  intakePeriod: string | null;
  yearLevel: string | null;
  entries: WaitlistEntry[];
  isBusy: boolean;
  onMove: (entry: WaitlistEntry, direction: 'up' | 'down') => void;
  onPromote: (entry: WaitlistEntry) => void;
}

export function WaitlistScopeGroup({
  intakePeriod,
  yearLevel,
  entries,
  isBusy,
  onMove,
  onPromote,
}: WaitlistScopeGroupProps) {
  const t = useTranslations('SchoolCapacityPlanner');
  const waitingEntries = entries.filter((entry) => entry.status === 'waiting');

  return (
    <SurfaceCard className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-baseline justify-between gap-2'>
        <h3 className='text-base font-semibold text-ink-900'>
          {yearLevel ?? t('unscopedYearLevel')}
        </h3>
        <span className='text-sm text-muted-foreground'>{intakePeriod ?? t('unscopedIntake')}</span>
      </div>
      <ul className='flex flex-col gap-2'>
        {entries.map((entry) => {
          const waitingIndex = waitingEntries.findIndex((w) => w.documentId === entry.documentId);
          return (
            <WaitlistRow
              key={entry.documentId}
              entry={entry}
              isFirst={waitingIndex === 0}
              isLast={waitingIndex === waitingEntries.length - 1}
              isBusy={isBusy}
              onMove={onMove}
              onPromote={onPromote}
            />
          );
        })}
      </ul>
    </SurfaceCard>
  );
}
