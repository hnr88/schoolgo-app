'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  agentNotificationsSchema,
  type AgentNotificationsValues,
} from '@/modules/agent-settings/schemas/notifications.schema';
import { useUpdateAgentNotifications } from '@/modules/agent-settings/queries/use-update-agent-notifications.mutation';
import { useUnsavedChangesGuard } from '@/modules/agent-settings/hooks/useUnsavedChangesGuard';
import { buildNotificationDefaults } from '@/modules/agent-settings/lib/notification-defaults';
import { NotificationEventRow } from '@/modules/agent-settings/components/NotificationEventRow';
import { AgentSelectField } from '@/modules/agent-settings/components/AgentSelectField';
import { AgentMessagingFields } from '@/modules/agent-settings/components/AgentMessagingFields';
import { AgentSettingsFormError } from '@/modules/agent-settings/components/AgentSettingsFormError';
import {
  AGENT_NOTIFICATION_DIGESTS,
  AGENT_NOTIFICATION_EVENTS,
} from '@/modules/agent-settings/constants/agent-settings.constants';
import type {
  AgentMessagingPreferences,
  AgentNotificationPreferences,
} from '@/modules/agent-settings/types/agent-settings.types';

interface AgentNotificationsFormProps {
  notifications: AgentNotificationPreferences;
  messaging: AgentMessagingPreferences;
}

export function AgentNotificationsForm({ notifications, messaging }: AgentNotificationsFormProps) {
  const t = useTranslations('AgentSettings');
  const { mutateAsync, isPending } = useUpdateAgentNotifications();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<AgentNotificationsValues>({
    resolver: zodResolver(agentNotificationsSchema),
    defaultValues: buildNotificationDefaults(notifications, messaging),
  });

  const isDirty = form.formState.isDirty;
  useUnsavedChangesGuard(isDirty);

  const handleSubmit = async (values: AgentNotificationsValues) => {
    setFormError(null);
    try {
      await mutateAsync(values);
      form.reset(values);
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      const apiMessage = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      setFormError(status === 422 && apiMessage ? apiMessage : t('saveError'));
    }
  };

  const digestOptions = AGENT_NOTIFICATION_DIGESTS.map((digest) => ({
    value: digest,
    label: t(`digest_${digest}` as Parameters<typeof t>[0]),
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <AgentSettingsFormError message={formError} /> : null}

        <fieldset className='flex flex-col gap-3'>
          <legend className='text-sm font-medium text-ink-900'>{t('eventsLegend')}</legend>
          <p className='text-xs text-muted-foreground'>{t('eventsHint')}</p>
          {AGENT_NOTIFICATION_EVENTS.map((event) => (
            <NotificationEventRow key={event} control={form.control} event={event} />
          ))}
        </fieldset>

        <AgentSelectField
          control={form.control}
          name='digest'
          label={t('digestLabel')}
          description={t('digestHint')}
          options={digestOptions}
        />

        <AgentMessagingFields control={form.control} />

        <Button
          type='submit'
          disabled={isPending || !isDirty}
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
