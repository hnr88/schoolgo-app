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
import { SCHOOL_SEARCH_MIN_CHARS } from '@/modules/agent-application-qa/constants/readiness.constants';
import type { AutocompleteSchoolHit } from '@/modules/school-search/types/autocomplete-schools.types';

interface SchoolSearchCommandProps {
  query: string;
  onQueryChange: (value: string) => void;
  results: AutocompleteSchoolHit[];
  isFetching: boolean;
  selectedIds: string[];
  isFull: boolean;
  onSelect: (school: AutocompleteSchoolHit) => void;
}

export function SchoolSearchCommand({
  query,
  onQueryChange,
  results,
  isFetching,
  selectedIds,
  isFull,
  onSelect,
}: SchoolSearchCommandProps) {
  const t = useTranslations('AgentApplicationQa');

  return (
    <Command shouldFilter={false}>
      <CommandInput placeholder={t('schoolsSearch')} value={query} onValueChange={onQueryChange} />
      <CommandList>
        <CommandEmpty>
          {query.trim().length < SCHOOL_SEARCH_MIN_CHARS
            ? t('schoolsHint')
            : isFetching
              ? t('schoolsSearching')
              : t('schoolsNoResults')}
        </CommandEmpty>
        <CommandGroup>
          {results.map((school) => {
            const isSelected = selectedIds.includes(school.id);
            return (
              <CommandItem
                key={school.id}
                value={school.id}
                disabled={!isSelected && isFull}
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
