'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
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
      <PopoverTrigger
        render={
          <Button
            type='button'
            variant='outline'
            aria-expanded={open}
            className={cn('h-12 w-full justify-between font-normal', !value && 'text-foggy')}
          />
        }
      >
        {value || t('selectNationality')}
        <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
      </PopoverTrigger>
      <PopoverContent className='w-80 p-0' align='start'>
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
                    className={cn('mr-2 size-4', value === country ? 'opacity-100' : 'opacity-0')}
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
