'use client';

import { useTranslations } from 'next-intl';
import { SlidersHorizontal } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PARENT_APPLICATION_STATUS_FILTERS } from '@/modules/applications/constants/parent-applications.constants';
import type { ParentApplicationToolbarProps } from '@/modules/applications/types/parent-component.types';

export function ParentApplicationToolbar({ status, onStatusChange }: ParentApplicationToolbarProps) {
  const t = useTranslations('ParentApplications');
  const options = PARENT_APPLICATION_STATUS_FILTERS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));
  const activeLabel = options.find((option) => option.value === status)?.label ?? t('allStatuses');

  return (
    <div className='flex items-center justify-end'>
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
              className={status === option.value ? 'font-semibold text-primary' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
