'use client';

import type { Control, FieldPath } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import type { SchoolPreferencesValues } from '@/modules/school-settings/schemas/preferences.schema';

interface SchoolPreferencesNotifyRowProps {
  control: Control<SchoolPreferencesValues>;
  name: FieldPath<SchoolPreferencesValues>;
  label: string;
  hint: string;
}

export function SchoolPreferencesNotifyRow({
  control,
  name,
  label,
  hint,
}: SchoolPreferencesNotifyRowProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-4'>
          <div className='flex flex-col gap-0.5'>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{hint}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              aria-label={label}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
