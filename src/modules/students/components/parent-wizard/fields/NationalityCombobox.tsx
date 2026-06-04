'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { COUNTRY_OPTIONS } from '@/modules/students/constants/countries.constants';

interface NationalityComboboxProps {
  value?: string;
  onChange: (value: string) => void;
}

export function NationalityCombobox({ value, onChange }: NationalityComboboxProps) {
  const t = useTranslations('StudentWizard');
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type='button'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            value ? 'text-ink-900' : 'text-muted-foreground',
          )}
        >
          {value || t('selectNationality')}
          <ChevronsUpDown className='size-4 shrink-0 opacity-50' aria-hidden='true' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0' align='start'>
        <Command>
          <CommandInput placeholder={t('nationalitySearch')} />
          <CommandList>
            <CommandEmpty>{t('nationalityEmpty')}</CommandEmpty>
            <CommandGroup>
              {COUNTRY_OPTIONS.map((country) => (
                <CommandItem
                  key={country}
                  value={country}
                  onSelect={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('size-4', value === country ? 'opacity-100' : 'opacity-0')}
                    aria-hidden='true'
                  />
                  {country}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
