'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, SlidersHorizontal, X, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { STATUS_FILTER_OPTIONS } from '@/modules/applications/constants/application.constants';
import type { ApplicationListToolbarProps } from '@/modules/applications/types/component.types';

export function ApplicationListToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: ApplicationListToolbarProps) {
  const t = useTranslations('Applications');
  const [localSearch, setLocalSearch] = useState(search);
  const statusOptions = STATUS_FILTER_OPTIONS.map((option) => ({
    ...option,
    label: t(option.labelKey),
  }));
  const activeStatusLabel =
    statusOptions.find((option) => option.value === status)?.label ?? t('allStatuses');

  return (
    <div className='flex items-center gap-3'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foggy' />
        <Input
          placeholder={t('searchPlaceholder')}
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            onSearchChange(e.target.value);
          }}
          className={cn('pl-9', localSearch && 'pr-9')}
        />
        {localSearch && (
          <button
            type='button'
            aria-label={t('clearSearch')}
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-foggy hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            onClick={() => {
              setLocalSearch('');
              onSearchChange('');
            }}
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2 text-foggy')}>
          <SlidersHorizontal className='h-4 w-4' />
          {activeStatusLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={6}>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              className={status === option.value ? 'font-semibold text-primary' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href='/dashboard/applications/new' className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
        <Plus className='h-4 w-4' />
        {t('addApplication')}
      </Link>
    </div>
  );
}
