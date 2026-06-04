'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { ParentStudentListToolbarProps } from '@/modules/students/types/parent-component.types';

export function ParentStudentListToolbar({
  search,
  onSearchChange,
  showArchived,
  onToggleArchived,
}: ParentStudentListToolbarProps) {
  const t = useTranslations('ParentStudents');
  const [localSearch, setLocalSearch] = useState(search);

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
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
      <div className='flex items-center gap-2'>
        <Switch
          id='show-archived-switch'
          checked={showArchived}
          onCheckedChange={onToggleArchived}
        />
        <Label htmlFor='show-archived-switch' className='cursor-pointer text-foggy'>
          {t('showArchived')}
        </Label>
      </div>
      <Link href='/parent/students/new' className={cn(buttonVariants(), 'gap-1.5')}>
        <Plus className='h-4 w-4' />
        {t('addStudent')}
      </Link>
    </div>
  );
}
