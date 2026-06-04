'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import {
  agentRegionSchema,
  type AgentRegionValues,
} from '@/modules/agent-settings/schemas/region.schema';
import { useUpdateAgentRegion } from '@/modules/agent-settings/queries/use-update-agent-region.mutation';
import { useUnsavedChangesGuard } from '@/modules/agent-settings/hooks/useUnsavedChangesGuard';
import {
  persistLocaleCookie,
  resolveInterfaceLocale,
} from '@/modules/agent-settings/lib/apply-interface-locale';
import {
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

export function useAgentRegionForm(locale: AgentLocalePreferences) {
  const t = useTranslations('AgentSettings');
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const { mutateAsync, isPending } = useUpdateAgentRegion();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<AgentRegionValues>({
    resolver: zodResolver(agentRegionSchema),
    defaultValues: {
      interfaceLanguage: (locale.interfaceLanguage ??
        DEFAULT_INTERFACE_LANGUAGE) as AgentInterfaceLanguage,
      timezone: resolveTimezone(locale.timezone),
      dateFormat: (locale.dateFormat ?? DEFAULT_DATE_FORMAT) as AgentDateFormat,
    },
  });

  const isDirty = form.formState.isDirty;
  useUnsavedChangesGuard(isDirty);

  const applyInterfaceLocale = (language: AgentInterfaceLanguage) => {
    const nextLocale = resolveInterfaceLocale(language);
    if (nextLocale === activeLocale) return;
    persistLocaleCookie(nextLocale);
    router.replace(pathname, { locale: nextLocale });
  };

  const handleSubmit = async (values: AgentRegionValues) => {
    setFormError(null);
    try {
      await mutateAsync(values);
      form.reset(values);
      applyInterfaceLocale(values.interfaceLanguage);
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      const apiMessage = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      setFormError(status === 422 && apiMessage ? apiMessage : t('saveError'));
    }
  };

  return { form, isPending, isDirty, formError, handleSubmit };
}
