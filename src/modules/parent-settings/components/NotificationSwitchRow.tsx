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
import type { NotificationPreferencesValues } from '@/modules/parent-settings/schemas/notification-preferences.schema';

interface NotificationSwitchRowProps {
  control: Control<NotificationPreferencesValues>;
  name: FieldPath<NotificationPreferencesValues>;
  labelKey: Parameters<ReturnType<typeof useTranslations<'NotificationPreferences'>>>[0];
  hintKey: Parameters<ReturnType<typeof useTranslations<'NotificationPreferences'>>>[0];
}

export function NotificationSwitchRow({
  control,
  name,
  labelKey,
  hintKey,
}: NotificationSwitchRowProps) {
  const t = useTranslations('NotificationPreferences');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/40 px-4 py-4'>
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
