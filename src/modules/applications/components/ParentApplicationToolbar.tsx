'use client';

import { useTranslations } from 'next-intl';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PARENT_APPLICATION_STATUS_FILTERS } from '@/modules/applications/constants/parent-applications.constants';
import type { ParentApplicationToolbarProps } from '@/modules/applications/types/parent-component.types';

const CHILD_FILTER_ALL = 'all';

export function ParentApplicationToolbar({
  status,
  onStatusChange,
  search,
  onSearchChange,
  childFilter,
  onChildFilterChange,
  childOptions,
  showChildFilter,
}: ParentApplicationToolbarProps) {
  const t = useTranslations('ParentApplications');
  const options = PARENT_APPLICATION_STATUS_FILTERS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));
  const activeLabel = options.find((option) => option.value === status)?.label ?? t('allStatuses');

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <div className='relative min-w-48 flex-1'>
        <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          type='search'
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchAria')}
          className='pl-9'
        />
      </div>

      {showChildFilter && childOptions.length > 0 && (
        <Select
          value={childFilter}
          onValueChange={(value) => onChildFilterChange(value ?? CHILD_FILTER_ALL)}
        >
          <SelectTrigger className='w-44' aria-label={t('childFilterLabel')}>
            <SelectValue placeholder={t('childFilterAll')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CHILD_FILTER_ALL}>{t('childFilterAll')}</SelectItem>
            {childOptions.map((child) => (
              <SelectItem key={child.documentId} value={child.documentId}>
                {child.firstName} {child.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2 text-foggy')}
        >
          <SlidersHorizontal className='h-4 w-4' />
          {activeLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={6}>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              className={status === option.value ? 'font-semibold text-primary-strong' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
