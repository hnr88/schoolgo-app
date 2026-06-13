'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { useAutocompleteSchools } from '@/modules/school-search';
import { useDebouncedValue } from '@/modules/parent-ask-school/hooks/useDebouncedValue';

interface SchoolPickerProps {
  value: string;
  label: string;
  onSelect: (school: { documentId: string; name: string }) => void;
}

export function SchoolPicker({ value, label, onSelect }: SchoolPickerProps) {
  const t = useTranslations('AskSchool');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query);
  const { data, isFetching } = useAutocompleteSchools(debounced, 8);
  const hits = data?.data ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type='button'
            variant='outline'
            aria-expanded={open}
            className={cn('w-full justify-between font-normal', !value && 'text-muted-foreground')}
          />
        }
      >
        {label || t('schoolPlaceholder')}
        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0' align='start'>
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={t('schoolSearchPlaceholder')}
          />
          <CommandList>
            {isFetching && (
              <div className='flex items-center justify-center gap-2 py-6 text-sm text-foggy'>
                <Loader2 className='h-4 w-4 animate-spin' />
                {t('schoolSearching')}
              </div>
            )}
            {!isFetching && <CommandEmpty>{t('schoolNoResults')}</CommandEmpty>}
            <CommandGroup>
              {hits.map((hit) => (
                <CommandItem
                  key={hit.id}
                  value={hit.id}
                  onSelect={() => {
                    onSelect({ documentId: hit.id, name: hit.name });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('h-4 w-4', value === hit.id ? 'opacity-100' : 'opacity-0')}
                  />
                  <span className='flex flex-col'>
                    <span className='font-medium'>{hit.name}</span>
                    <span className='text-xs text-foggy'>
                      {[hit.suburb, hit.state].filter(Boolean).join(', ')}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
