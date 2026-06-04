'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SCHOOL_SETTINGS_LOCALES } from '@/modules/school-settings/constants/school-settings.constants';
import type { SchoolPreferencesValues } from '@/modules/school-settings/schemas/preferences.schema';

export function SchoolLanguageField({
  control,
}: {
  control: Control<SchoolPreferencesValues>;
}) {
  const t = useTranslations('SchoolSettings');

  return (
    <FormField
      control={control}
      name='language'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('languageLabel')}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className='w-full sm:w-64'>
                <SelectValue placeholder={t('languagePlaceholder')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {SCHOOL_SETTINGS_LOCALES.map((locale) => (
                <SelectItem key={locale} value={locale}>
                  {t(`language_${locale}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{t('languageHint')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
