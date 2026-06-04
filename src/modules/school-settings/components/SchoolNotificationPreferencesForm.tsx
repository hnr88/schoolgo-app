'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  schoolNotificationPreferencesSchema,
  type SchoolNotificationPreferencesValues,
} from '@/modules/school-settings/schemas/notification-preferences.schema';
import { useUpdateSchoolNotificationPreferences } from '@/modules/school-settings/queries/use-update-school-notification-preferences.mutation';
import { SchoolNotificationSwitchRow } from '@/modules/school-settings/components/SchoolNotificationSwitchRow';
import { SchoolDigestFrequencyField } from '@/modules/school-settings/components/SchoolDigestFrequencyField';
import { SchoolSettingsFormError } from '@/modules/school-settings/components/SchoolSettingsFormError';
import {
  SCHOOL_NOTIFICATION_CHANNELS,
  SCHOOL_NOTIFICATION_TOPICS,
} from '@/modules/school-settings/constants/notification-preferences.constants';
import { getSchoolServerError } from '@/modules/school-settings/lib/server-error';
import type { SchoolNotificationPreferencesData } from '@/modules/school-settings/types/notification-preferences.types';

export function SchoolNotificationPreferencesForm({
  preferences,
}: {
  preferences: SchoolNotificationPreferencesData;
}) {
  const t = useTranslations('SchoolNotificationPreferences');
  const [formError, setFormError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useUpdateSchoolNotificationPreferences();

  const form = useForm<SchoolNotificationPreferencesValues>({
    resolver: zodResolver(schoolNotificationPreferencesSchema),
    defaultValues: {
      emailEnabled: preferences.emailEnabled,
      smsEnabled: preferences.smsEnabled,
      inAppEnabled: preferences.inAppEnabled,
      applicationUpdates: preferences.applicationUpdates,
      offers: preferences.offers,
      messages: preferences.messages,
      deadlines: preferences.deadlines,
      tours: preferences.tours,
      marketing: preferences.marketing,
      digestFrequency: preferences.digestFrequency,
    },
  });

  const handleSubmit = async (values: SchoolNotificationPreferencesValues) => {
    setFormError(null);
    try {
      const data = await mutateAsync(values);
      form.reset({
        emailEnabled: data.emailEnabled,
        smsEnabled: data.smsEnabled,
        inAppEnabled: data.inAppEnabled,
        applicationUpdates: data.applicationUpdates,
        offers: data.offers,
        messages: data.messages,
        deadlines: data.deadlines,
        tours: data.tours,
        marketing: data.marketing,
        digestFrequency: data.digestFrequency,
      });
    } catch (error) {
      const { status, message } = getSchoolServerError(error);
      setFormError(status === 422 && message ? message : t('saveError'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <SchoolSettingsFormError message={formError} /> : null}

        <fieldset className='flex flex-col gap-3'>
          <legend className='text-sm font-medium text-ink-900'>{t('channelsLegend')}</legend>
          <p className='text-xs text-muted-foreground'>{t('channelsHint')}</p>
          {SCHOOL_NOTIFICATION_CHANNELS.map((channel) => (
            <SchoolNotificationSwitchRow
              key={channel}
              control={form.control}
              name={channel}
              labelKey={`${channel}Label`}
              hintKey={`${channel}Hint`}
            />
          ))}
        </fieldset>

        <fieldset className='flex flex-col gap-3'>
          <legend className='text-sm font-medium text-ink-900'>{t('topicsLegend')}</legend>
          <p className='text-xs text-muted-foreground'>{t('topicsHint')}</p>
          {SCHOOL_NOTIFICATION_TOPICS.map((topic) => (
            <SchoolNotificationSwitchRow
              key={topic}
              control={form.control}
              name={topic}
              labelKey={`${topic}Label`}
              hintKey={`${topic}Hint`}
            />
          ))}
        </fieldset>

        <SchoolDigestFrequencyField control={form.control} />

        <Button
          type='submit'
          disabled={isPending || !form.formState.isDirty}
          aria-busy={isPending}
          className='self-start'
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
