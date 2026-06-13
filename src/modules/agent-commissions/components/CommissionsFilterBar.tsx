'use client';

import { useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  COMMISSION_MILESTONE_OPTIONS,
  COMMISSION_STATUS_OPTIONS,
} from '@/modules/agent-commissions/constants/agent-commissions.constants';
import type {
  CommissionFilters,
  CommissionMilestone,
  CommissionStatus,
} from '@/modules/agent-commissions/types/agent-commissions.types';

interface CommissionsFilterBarProps {
  filters: CommissionFilters;
  onChange: (next: CommissionFilters) => void;
}

export function CommissionsFilterBar({ filters, onChange }: CommissionsFilterBarProps) {
  const t = useTranslations('AgentCommissions');

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onChange({ ...filters, status: value as CommissionStatus | 'all' })
        }
      >
        <SelectTrigger className='w-44' aria-label={t('filterStatusLabel')}>
          <SelectValue placeholder={t('filterStatusLabel')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>{t('filterAllStatuses')}</SelectItem>
          {COMMISSION_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`status_${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.milestone}
        onValueChange={(value) =>
          onChange({ ...filters, milestone: value as CommissionMilestone | 'all' })
        }
      >
        <SelectTrigger className='w-44' aria-label={t('filterMilestoneLabel')}>
          <SelectValue placeholder={t('filterMilestoneLabel')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>{t('filterAllMilestones')}</SelectItem>
          {COMMISSION_MILESTONE_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`milestone_${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
