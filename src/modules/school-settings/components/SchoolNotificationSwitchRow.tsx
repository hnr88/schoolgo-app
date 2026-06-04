'use client';

import type { Control, FieldPath } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import type { SchoolNotificationPreferencesValues } from '@/modules/school-settings/schemas/notification-preferences.schema';

interface SchoolNotificationSwitchRowProps {
  control: Control<SchoolNotificationPreferencesValues>;
  name: FieldPath<SchoolNotificationPreferencesValues>;
  labelKey: Parameters<ReturnType<typeof useTranslations<'SchoolNotificationPreferences'>>>[0];
  hintKey: Parameters<ReturnType<typeof useTranslations<'SchoolNotificationPreferences'>>>[0];
}

export function SchoolNotificationSwitchRow({
  control,
  name,
  labelKey,
  hintKey,
}: SchoolNotificationSwitchRowProps) {
  const t = useTranslations('SchoolNotificationPreferences');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex items-center justify-between gap-4 rounded-lg border px-4 py-4 transition-colors',
            field.value ? 'border-arches-200 bg-arches-50' : 'border-border bg-muted/40',
          )}
        >
          <div className='flex flex-col gap-0.5'>
            <FormLabel>{t(labelKey)}</FormLabel>
            <FormDescription>{t(hintKey)}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              aria-label={t(labelKey)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
