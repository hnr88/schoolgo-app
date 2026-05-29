'use client';

import { useTranslations } from 'next-intl';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { SCHOOL_STATUS_LABEL_KEY } from '@/modules/school-applications/lib/school-application';
import type { SchoolApplicationStatus } from '@/modules/school-applications/types/school-applications.types';

const FILTERS: { value: string; labelKey: string }[] = [
  { value: 'all', labelKey: 'allStatuses' },
  { value: 'submitted', labelKey: SCHOOL_STATUS_LABEL_KEY.submitted },
  { value: 'received', labelKey: SCHOOL_STATUS_LABEL_KEY.received },
  { value: 'under_review', labelKey: SCHOOL_STATUS_LABEL_KEY.under_review },
  { value: 'documents_requested', labelKey: SCHOOL_STATUS_LABEL_KEY.documents_requested },
  { value: 'offer_made', labelKey: SCHOOL_STATUS_LABEL_KEY.offer_made },
  { value: 'coe_issued', labelKey: SCHOOL_STATUS_LABEL_KEY.coe_issued },
  { value: 'enrolled', labelKey: SCHOOL_STATUS_LABEL_KEY.enrolled },
  { value: 'declined', labelKey: SCHOOL_STATUS_LABEL_KEY.declined },
];

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onExport: () => void;
}

export function SchoolApplicationToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onExport,
}: Props) {
  const t = useTranslations('SchoolApplications');
  const activeLabel = t(FILTERS.find((f) => f.value === status)?.labelKey ?? 'allStatuses');

  return (
    <div className='flex items-center gap-3'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foggy' />
        <Input
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn('pl-9', search && 'pr-9')}
          aria-label={t('searchPlaceholder')}
        />
        {search && (
          <button
            type='button'
            aria-label={t('clearSearch')}
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-foggy hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            onClick={() => onSearchChange('')}
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2 text-foggy')}>
          <SlidersHorizontal className='h-4 w-4' />
          {activeLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={6}>
          {FILTERS.map((f) => (
            <DropdownMenuItem
              key={f.value}
              onClick={() => onStatusChange(f.value)}
              className={status === f.value ? 'font-semibold text-primary' : ''}
            >
              {t(f.labelKey)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button type='button' onClick={onExport} className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
        {t('exportCsv')}
      </button>
    </div>
  );
}

export type { SchoolApplicationStatus };
