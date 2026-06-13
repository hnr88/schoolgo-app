'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  notificationPreferencesSchema,
  type NotificationPreferencesValues,
} from '@/modules/parent-settings/schemas/notification-preferences.schema';
import { useUpdateNotificationPreferences } from '@/modules/parent-settings/queries/use-update-notification-preferences.mutation';
import { NotificationSwitchRow } from '@/modules/parent-settings/components/NotificationSwitchRow';
import { DigestFrequencyField } from '@/modules/parent-settings/components/DigestFrequencyField';
import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TOPICS,
} from '@/modules/parent-settings/constants/notification-preferences.constants';
import type { NotificationPreferencesData } from '@/modules/parent-settings/types/notification-preferences.types';

export function NotificationPreferencesForm({
  preferences,
}: {
  preferences: NotificationPreferencesData;
}) {
  const t = useTranslations('NotificationPreferences');
  const { mutateAsync, isPending } = useUpdateNotificationPreferences();

  const form = useForm<NotificationPreferencesValues>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      emailEnabled: preferences.emailEnabled,
      smsEnabled: preferences.smsEnabled,
      inAppEnabled: preferences.inAppEnabled,
      applicationUpdates: preferences.applicationUpdates,
      offers: preferences.offers,
      messages: preferences.messages,
      deadlines: preferences.deadlines,
      marketing: preferences.marketing,
      digestFrequency: preferences.digestFrequency,
    },
  });

  const handleSubmit = async (values: NotificationPreferencesValues) => {
    await mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <fieldset className='flex flex-col gap-3'>
          <legend className='text-sm font-medium text-ink-900'>{t('channelsLegend')}</legend>
          <p className='text-xs text-muted-foreground'>{t('channelsHint')}</p>
          {NOTIFICATION_CHANNELS.map((channel) => (
            <NotificationSwitchRow
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
          {NOTIFICATION_TOPICS.map((topic) => (
            <NotificationSwitchRow
              key={topic}
              control={form.control}
              name={topic}
              labelKey={`${topic}Label`}
              hintKey={`${topic}Hint`}
            />
          ))}
        </fieldset>

        <DigestFrequencyField control={form.control} />

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
