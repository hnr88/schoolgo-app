'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { StudentListToolbarProps } from '@/modules/students/types/component.types';

export function StudentListToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: StudentListToolbarProps) {
  const t = useTranslations('Students');
  const [localSearch, setLocalSearch] = useState(search);

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-1 items-center gap-3'>
        <div className='relative max-w-sm flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foggy' />
          <Input
            placeholder={t('searchPlaceholder')}
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearchChange(e.target.value);
            }}
            className='pl-9'
          />
        </div>
        <Select value={status} onValueChange={(v) => { if (v) onStatusChange(v); }}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder={t('allStatuses')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{t('allStatuses')}</SelectItem>
            <SelectItem value='active'>{t('statusActive')}</SelectItem>
            <SelectItem value='archived'>{t('statusArchived')}</SelectItem>
            <SelectItem value='enrolled'>{t('statusEnrolled')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Link href='/dashboard/students/new'>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          {t('addStudent')}
        </Button>
      </Link>
    </div>
  );
}
