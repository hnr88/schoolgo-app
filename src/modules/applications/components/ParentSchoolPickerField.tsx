'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAutocompleteSchools } from '@/modules/school-search/queries/use-autocomplete-schools.query';
import { SCHOOL_SEARCH_MIN_CHARS } from '@/modules/applications/constants/create-application.constants';
import type { ParentSchoolPickerFieldProps } from '@/modules/applications/types/parent-create-application.types';

export function ParentSchoolPickerField({ control, presetSchool }: ParentSchoolPickerFieldProps) {
  const t = useTranslations('ParentApplications');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(
    presetSchool ? `${presetSchool.name}${presetSchool.suburb ? `, ${presetSchool.suburb}` : ''}` : '',
  );
  const { data, isFetching } = useAutocompleteSchools(query);
  const results = data?.data ?? [];

  return (
    <FormField
      control={control}
      name='school'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{t('newSchoolLabel')}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <FormControl>
              <PopoverTrigger
                render={
                  <Button
                    type='button'
                    variant='outline'
                    aria-expanded={open}
                    className={cn('w-full justify-between font-normal', !field.value && 'text-foggy')}
                  />
                }
              >
                {selectedLabel || t('newSelectSchool')}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </PopoverTrigger>
            </FormControl>
            <PopoverContent className='w-80 p-0' align='start'>
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder={t('newSearchSchool')}
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                  <CommandEmpty>
                    {query.trim().length < SCHOOL_SEARCH_MIN_CHARS
                      ? t('newSchoolHint')
                      : isFetching
                        ? t('newSearching')
                        : t('newNoSchools')}
                  </CommandEmpty>
                  <CommandGroup>
                    {results.map((school) => (
                      <CommandItem
                        key={school.id}
                        value={school.id}
                        onSelect={() => {
                          field.onChange(school.id);
                          setSelectedLabel(
                            `${school.name}${school.suburb ? `, ${school.suburb}` : ''}`,
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === school.id ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        <span>
                          {school.name}
                          {school.suburb ? `, ${school.suburb}` : ''}
                          {school.state ? ` (${school.state})` : ''}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
