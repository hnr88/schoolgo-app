'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
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
  agentRegionSchema,
  type AgentRegionValues,
} from '@/modules/agent-settings/schemas/region.schema';
import { useUpdateAgentRegion } from '@/modules/agent-settings/queries/use-update-agent-region.mutation';
import {
  AGENT_DATE_FORMATS,
  AGENT_INTERFACE_LANGUAGES,
  AGENT_TIMEZONES,
  DEFAULT_DATE_FORMAT,
  DEFAULT_INTERFACE_LANGUAGE,
  DEFAULT_TIMEZONE,
} from '@/modules/agent-settings/constants/agent-settings.constants';
import type {
  AgentDateFormat,
  AgentInterfaceLanguage,
  AgentLocalePreferences,
} from '@/modules/agent-settings/types/agent-settings.types';

type AgentTimezone = (typeof AGENT_TIMEZONES)[number];

function resolveTimezone(value: string | null): AgentTimezone {
  return AGENT_TIMEZONES.includes(value as AgentTimezone)
    ? (value as AgentTimezone)
    : DEFAULT_TIMEZONE;
}

export function AgentRegionForm({ locale }: { locale: AgentLocalePreferences }) {
  const t = useTranslations('AgentSettings');
  const { mutateAsync, isPending } = useUpdateAgentRegion();

  const form = useForm<AgentRegionValues>({
    resolver: zodResolver(agentRegionSchema),
    defaultValues: {
      interfaceLanguage: (locale.interfaceLanguage ??
        DEFAULT_INTERFACE_LANGUAGE) as AgentInterfaceLanguage,
      timezone: resolveTimezone(locale.timezone),
      dateFormat: (locale.dateFormat ?? DEFAULT_DATE_FORMAT) as AgentDateFormat,
    },
  });

  const handleSubmit = async (values: AgentRegionValues) => {
    await mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <FormField
          control={form.control}
          name='interfaceLanguage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('interfaceLanguageLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full sm:w-64'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AGENT_INTERFACE_LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {t(`interfaceLanguage_${lang}` as Parameters<typeof t>[0])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{t('interfaceLanguageHint')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='timezone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('timezoneLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full sm:w-64'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AGENT_TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{t('timezoneHint')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dateFormat'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('dateFormatLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full sm:w-64'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AGENT_DATE_FORMATS.map((fmt) => (
                    <SelectItem key={fmt} value={fmt}>
                      {t(`dateFormat_${fmt}` as Parameters<typeof t>[0])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>{t('dateFormatHint')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
