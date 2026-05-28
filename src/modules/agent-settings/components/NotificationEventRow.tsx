'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import type { AgentNotificationsValues } from '@/modules/agent-settings/schemas/notifications.schema';
import type { AgentNotificationEvent } from '@/modules/agent-settings/types/agent-settings.types';

interface NotificationEventRowProps {
  control: Control<AgentNotificationsValues>;
  event: AgentNotificationEvent;
}

export function NotificationEventRow({ control, event }: NotificationEventRowProps) {
  const t = useTranslations('AgentSettings');
  const label = t(`notifEvent_${event}` as Parameters<typeof t>[0]);

  return (
    <div className='flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3'>
      <span className='text-sm text-ink-900'>{label}</span>
      <div className='flex items-center gap-6'>
        <FormField
          control={control}
          name={`events.${event}.inApp`}
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>{t('channelInApp')}</span>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label={`${label} — ${t('channelInApp')}`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`events.${event}.email`}
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>{t('channelEmail')}</span>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label={`${label} — ${t('channelEmail')}`}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
