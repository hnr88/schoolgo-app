'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
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
  agentNotificationsSchema,
  type AgentNotificationsValues,
} from '@/modules/agent-settings/schemas/notifications.schema';
import { useUpdateAgentNotifications } from '@/modules/agent-settings/queries/use-update-agent-notifications.mutation';
import { buildNotificationDefaults } from '@/modules/agent-settings/lib/notification-defaults';
import { NotificationEventRow } from '@/modules/agent-settings/components/NotificationEventRow';
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

  const form = useForm<AgentNotificationsValues>({
    resolver: zodResolver(agentNotificationsSchema),
    defaultValues: buildNotificationDefaults(notifications, messaging),
  });

  const handleSubmit = async (values: AgentNotificationsValues) => {
    await mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <fieldset className='flex flex-col gap-3'>
          <legend className='text-sm font-medium text-ink-900'>{t('eventsLegend')}</legend>
          <p className='text-xs text-muted-foreground'>{t('eventsHint')}</p>
          {AGENT_NOTIFICATION_EVENTS.map((event) => (
            <NotificationEventRow key={event} control={form.control} event={event} />
          ))}
        </fieldset>

        <FormField
          control={form.control}
          name='digest'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('digestLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full sm:w-64'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AGENT_NOTIFICATION_DIGESTS.map((digest) => (
                    <SelectItem key={digest} value={digest}>
                      {t(`digest_${digest}` as Parameters<typeof t>[0])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{t('digestHint')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset className='flex flex-col gap-4'>
          <legend className='text-sm font-medium text-ink-900'>{t('messagingLegend')}</legend>
          <FormField
            control={form.control}
            name='sendOnEnter'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-4'>
                <div className='flex flex-col gap-0.5'>
                  <FormLabel>{t('sendOnEnterLabel')}</FormLabel>
                  <FormDescription>{t('sendOnEnterHint')}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label={t('sendOnEnterLabel')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='signature'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signatureLabel')}</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder={t('signaturePlaceholder')} {...field} />
                </FormControl>
                <FormDescription>{t('signatureHint')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='appendSignature'
            render={({ field }) => (
              <FormItem className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-4'>
                <div className='flex flex-col gap-0.5'>
                  <FormLabel>{t('appendSignatureLabel')}</FormLabel>
                  <FormDescription>{t('appendSignatureHint')}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label={t('appendSignatureLabel')}
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
