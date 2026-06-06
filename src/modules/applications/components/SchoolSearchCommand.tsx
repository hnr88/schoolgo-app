'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { SCHOOL_SEARCH_MIN_CHARS } from '@/modules/applications/constants/create-application.constants';
import type { SchoolSearchCommandProps } from '@/modules/applications/types/create-application.types';

export function SchoolSearchCommand({
  query,
  onQueryChange,
  results,
  isFetching,
  selectedIds,
  isFull,
  onSelect,
}: SchoolSearchCommandProps) {
  const t = useTranslations('Applications');

  return (
    <Command shouldFilter={false}>
      <CommandInput placeholder={t('createSearchSchool')} value={query} onValueChange={onQueryChange} />
      <CommandList>
        <CommandEmpty>
          {query.trim().length < SCHOOL_SEARCH_MIN_CHARS
            ? t('createSchoolHint')
            : isFetching
              ? t('createSearching')
              : t('createNoSchools')}
        </CommandEmpty>
        <CommandGroup>
          {results.map((school) => {
            const isSelected = selectedIds.includes(school.id);
            return (
              <CommandItem
                key={school.id}
                value={school.id}
                disabled={isFull && !isSelected}
                onSelect={() => onSelect(school)}
              >
                <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                <span>
                  {school.name}
                  {school.suburb ? `, ${school.suburb}` : ''}
                  {school.state ? ` (${school.state})` : ''}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
