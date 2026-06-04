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
import { SCHOOL_DIGEST_FREQUENCIES } from '@/modules/school-settings/constants/notification-preferences.constants';
import type { SchoolNotificationPreferencesValues } from '@/modules/school-settings/schemas/notification-preferences.schema';

export function SchoolDigestFrequencyField({
  control,
}: {
  control: Control<SchoolNotificationPreferencesValues>;
}) {
  const t = useTranslations('SchoolNotificationPreferences');

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
              {SCHOOL_DIGEST_FREQUENCIES.map((frequency) => (
                <FormItem
                  key={frequency}
                  className='flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3'
                >
                  <FormControl>
                    <RadioGroupItem value={frequency} id={`school-digest-${frequency}`} />
                  </FormControl>
                  <FormLabel htmlFor={`school-digest-${frequency}`} className='font-normal'>
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
