'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DIGEST_FREQUENCIES } from '@/modules/parent-settings/constants/notification-preferences.constants';
import type { NotificationPreferencesValues } from '@/modules/parent-settings/schemas/notification-preferences.schema';

export function DigestFrequencyField({
  control,
}: {
  control: Control<NotificationPreferencesValues>;
}) {
  const t = useTranslations('NotificationPreferences');

  return (
    <FormField
      control={control}
      name='digestFrequency'
      render={({ field }) => (
        <FormItem className='flex flex-col gap-3'>
          <FormLabel>{t('digestLegend')}</FormLabel>
          <FormDescription>{t('digestHint')}</FormDescription>
          <FormControl>
            <RadioGroup value={field.value} onValueChange={(value) => field.onChange(value)}>
              {DIGEST_FREQUENCIES.map((frequency) => (
                <FormItem
                  key={frequency}
                  className='flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3'
                >
                  <FormControl>
                    <RadioGroupItem value={frequency} id={`digest-${frequency}`} />
                  </FormControl>
                  <FormLabel htmlFor={`digest-${frequency}`} className='font-normal'>
                    {t(`digest_${frequency}`)}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
