'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { AgentSettingsFormMessage } from '@/modules/agent-settings/components/AgentSettingsFormMessage';
import type { AgentNotificationsValues } from '@/modules/agent-settings/schemas/notifications.schema';

type SwitchName = 'sendOnEnter' | 'appendSignature';

interface ToggleProps {
  control: Control<AgentNotificationsValues>;
  name: SwitchName;
  label: string;
  hint: string;
}

function MessagingToggle({ control, name, label, hint }: ToggleProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-4'>
          <div className='flex flex-col gap-0.5'>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{hint}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} aria-label={label} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function AgentMessagingFields({ control }: { control: Control<AgentNotificationsValues> }) {
  const t = useTranslations('AgentSettings');

  return (
    <fieldset className='flex flex-col gap-4'>
      <legend className='text-sm font-medium text-ink-900'>{t('messagingLegend')}</legend>
      <MessagingToggle
        control={control}
        name='sendOnEnter'
        label={t('sendOnEnterLabel')}
        hint={t('sendOnEnterHint')}
      />
      <FormField
        control={control}
        name='signature'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('signatureLabel')}</FormLabel>
            <FormControl>
              <Textarea rows={3} placeholder={t('signaturePlaceholder')} {...field} />
            </FormControl>
            <FormDescription>{t('signatureHint')}</FormDescription>
            <AgentSettingsFormMessage />
          </FormItem>
        )}
      />
      <MessagingToggle
        control={control}
        name='appendSignature'
        label={t('appendSignatureLabel')}
        hint={t('appendSignatureHint')}
      />
    </fieldset>
  );
}
