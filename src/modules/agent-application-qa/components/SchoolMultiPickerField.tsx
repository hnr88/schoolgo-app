'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronsUpDown } from 'lucide-react';
import type { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAutocompleteSchools } from '@/modules/school-search/queries/use-autocomplete-schools.query';
import { SchoolSearchCommand } from '@/modules/agent-application-qa/components/SchoolSearchCommand';
import { SelectedSchoolBadges } from '@/modules/agent-application-qa/components/SelectedSchoolBadges';
import { MAX_READINESS_SCHOOLS } from '@/modules/agent-application-qa/constants/readiness.constants';
import type { AutocompleteSchoolHit } from '@/modules/school-search/types/autocomplete-schools.types';
import type {
  ReadinessFormValues,
  ReadinessSchoolOption,
} from '@/modules/agent-application-qa/types/readiness.types';

interface SchoolMultiPickerFieldProps {
  control: Control<ReadinessFormValues>;
  selected: (ids: string[]) => ReadinessSchoolOption[];
  onToggle: (current: string[], school: AutocompleteSchoolHit) => string[];
  onRemove: (current: string[], documentId: string) => string[];
}

export function SchoolMultiPickerField({
  control,
  selected,
  onToggle,
  onRemove,
}: SchoolMultiPickerFieldProps) {
  const t = useTranslations('AgentApplicationQa');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data, isFetching } = useAutocompleteSchools(query);
  const results = data?.data ?? [];

  return (
    <FormField
      control={control}
      name='schools'
      render={({ field }) => {
        const chosen = selected(field.value);
        const isFull = field.value.length >= MAX_READINESS_SCHOOLS;
        return (
          <FormItem className='flex flex-col'>
            <FormLabel>{t('schoolsLabel')}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <FormControl>
                <PopoverTrigger
                  render={
                    <Button
                      type='button'
                      variant='outline'
                      aria-expanded={open}
                      className={cn('w-full justify-between font-normal', chosen.length === 0 && 'text-foggy')}
                    />
                  }
                >
                  {chosen.length === 0
                    ? t('schoolsSelect')
                    : t('schoolsSelectedCount', { count: chosen.length })}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </PopoverTrigger>
              </FormControl>
              <PopoverContent className='w-80 p-0' align='start'>
                <SchoolSearchCommand
                  query={query}
                  onQueryChange={setQuery}
                  results={results}
                  isFetching={isFetching}
                  selectedIds={field.value}
                  isFull={isFull}
                  onSelect={(school) => field.onChange(onToggle(field.value, school))}
                />
              </PopoverContent>
            </Popover>
            <SelectedSchoolBadges
              schools={chosen}
              onRemove={(documentId) => field.onChange(onRemove(field.value, documentId))}
            />
            {isFull && <p className='text-sm text-foggy'>{t('schoolsMax', { max: MAX_READINESS_SCHOOLS })}</p>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
