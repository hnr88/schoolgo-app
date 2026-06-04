'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SETTINGS_LOCALES } from '@/modules/parent-settings/constants/parent-settings.constants';
import type { PreferencesValues } from '@/modules/parent-settings/schemas/preferences.schema';

export function PreferencesLanguageField({ control }: { control: Control<PreferencesValues> }) {
  const t = useTranslations('ParentSettings');

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
              {SETTINGS_LOCALES.map((locale) => (
                <SelectItem key={locale} value={locale}>
                  {t(`language_${locale}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{t('languageHint')}</FormDescription>
        </FormItem>
      )}
    />
  );
}
