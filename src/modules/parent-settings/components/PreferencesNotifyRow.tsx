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
import { cn } from '@/lib/utils';
import type { PreferencesValues } from '@/modules/parent-settings/schemas/preferences.schema';

interface PreferencesNotifyRowProps {
  control: Control<PreferencesValues>;
  name: FieldPath<PreferencesValues>;
  label: string;
  hint: string;
}

export function PreferencesNotifyRow({ control, name, label, hint }: PreferencesNotifyRowProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex items-center justify-between gap-4 rounded-lg border px-4 py-4 transition-colors',
            field.value ? 'border-rausch-200 bg-rausch-50' : 'border-border bg-muted/40',
          )}
        >
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
