import { useTranslations } from 'next-intl';
import { ArrowUp, ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/modules/core';
import type { WaitlistEntry } from '@/modules/school-capacity-planner/types/capacity-planner.types';
import { WAITLIST_STATUS_STYLES } from '@/modules/school-capacity-planner/constants/capacity-planner.constants';

interface WaitlistRowProps {
  entry: WaitlistEntry;
  isFirst: boolean;
  isLast: boolean;
  isBusy: boolean;
  onMove: (entry: WaitlistEntry, direction: 'up' | 'down') => void;
  onPromote: (entry: WaitlistEntry) => void;
}

export function WaitlistRow({
  entry,
  isFirst,
  isLast,
  isBusy,
  onMove,
  onPromote,
}: WaitlistRowProps) {
  const t = useTranslations('SchoolCapacityPlanner');
  const isWaiting = entry.status === 'waiting';
  const studentName = entry.application?.student?.name?.trim() || t('unknownStudent');
  const agentName = entry.application?.agent?.companyName;

  return (
    <li className='flex items-center gap-3 rounded-lg bg-page-surface px-3 py-2.5'>
      <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-xs font-bold tabular-nums text-ink-900'>
        {entry.rank ?? '—'}
      </span>
      <div className='flex min-w-0 flex-1 flex-col'>
        <span className='truncate text-sm font-medium text-ink-900'>{studentName}</span>
        <span className='truncate text-xs text-muted-foreground'>
          {agentName ? t('viaAgent', { agent: agentName }) : t('directApplicant')}
        </span>
      </div>
      <StatusBadge
        status={entry.status}
        label={t(`waitlistStatus_${entry.status}`)}
        styles={WAITLIST_STATUS_STYLES}
      />
      {isWaiting && (
        <div className='flex shrink-0 items-center gap-1'>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            disabled={isFirst || isBusy}
            aria-label={t('moveUp')}
            onClick={() => onMove(entry, 'up')}
          >
            <ArrowUp className='h-4 w-4' />
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            disabled={isLast || isBusy}
            aria-label={t('moveDown')}
            onClick={() => onMove(entry, 'down')}
          >
            <ArrowDown className='h-4 w-4' />
          </Button>
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled={isBusy}
            onClick={() => onPromote(entry)}
          >
            <ArrowUpRight className='mr-1 h-4 w-4' />
            {t('promoteButton')}
          </Button>
        </div>
      )}
    </li>
  );
}
