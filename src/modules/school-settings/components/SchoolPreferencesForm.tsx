'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Form,
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
import {
  schoolPreferencesSchema,
  type SchoolPreferencesValues,
} from '@/modules/school-settings/schemas/preferences.schema';
import { useUpdateSchoolProfile } from '@/modules/school-settings/queries/use-update-school-profile.mutation';
import {
  DEFAULT_SCHOOL_SETTINGS_LOCALE,
  SCHOOL_SETTINGS_LOCALES,
} from '@/modules/school-settings/constants/school-settings.constants';
import type { SchoolUserMe } from '@/modules/school-settings/types/school-settings.types';

export function SchoolPreferencesForm({ me }: { me: SchoolUserMe }) {
  const t = useTranslations('SchoolSettings');
  const { mutateAsync, isPending } = useUpdateSchoolProfile();

  const form = useForm<SchoolPreferencesValues>({
    resolver: zodResolver(schoolPreferencesSchema),
    defaultValues: {
      language: me.preferences?.language ?? DEFAULT_SCHOOL_SETTINGS_LOCALE,
      notifications: {
        email: me.preferences?.notifications?.email ?? true,
        sms: me.preferences?.notifications?.sms ?? false,
      },
    },
  });

  const handleSubmit = async (values: SchoolPreferencesValues) => {
    await mutateAsync({ preferences: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('languageLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <fieldset className='flex flex-col gap-4'>
          <legend className='text-sm font-medium text-ink-900'>{t('notificationsLabel')}</legend>
          <FormField
            control={form.control}
            name='notifications.email'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-4'>
                <div className='flex flex-col gap-0.5'>
                  <FormLabel>{t('notifyEmailLabel')}</FormLabel>
                  <FormDescription>{t('notifyEmailHint')}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label={t('notifyEmailLabel')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='notifications.sms'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-4'>
                <div className='flex flex-col gap-0.5'>
                  <FormLabel>{t('notifySmsLabel')}</FormLabel>
                  <FormDescription>{t('notifySmsHint')}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label={t('notifySmsLabel')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </fieldset>

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
