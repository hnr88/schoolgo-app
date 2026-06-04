'use client';

import { useTranslations } from 'next-intl';
import {
  AGENT_DATE_FORMATS,
  AGENT_INTERFACE_LANGUAGES,
  AGENT_TIMEZONES,
} from '@/modules/agent-settings/constants/agent-settings.constants';

interface AgentSelectOption {
  value: string;
  label: string;
}

export interface AgentRegionOptions {
  languageOptions: AgentSelectOption[];
  timezoneOptions: AgentSelectOption[];
  dateFormatOptions: AgentSelectOption[];
}

export function useAgentRegionOptions(): AgentRegionOptions {
  const t = useTranslations('AgentSettings');

  return {
    languageOptions: AGENT_INTERFACE_LANGUAGES.map((lang) => ({
      value: lang,
      label: t(`interfaceLanguage_${lang}` as Parameters<typeof t>[0]),
    })),
    timezoneOptions: AGENT_TIMEZONES.map((tz) => ({
      value: tz,
      label: tz.replace(/_/g, ' '),
    })),
    dateFormatOptions: AGENT_DATE_FORMATS.map((fmt) => ({
      value: fmt,
      label: t(`dateFormat_${fmt}` as Parameters<typeof t>[0]),
    })),
  };
}
