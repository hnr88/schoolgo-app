import type {
  AgentDateFormat,
  AgentInterfaceLanguage,
  AgentNotificationDigest,
  AgentNotificationEvent,
} from '@/modules/agent-settings/types/agent-settings.types';

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_HAS_UPPERCASE = /[A-Z]/;
export const PASSWORD_HAS_LOWERCASE = /[a-z]/;
export const PASSWORD_HAS_NUMBER = /[0-9]/;

export const PHONE_PATTERN = /^\+?[\d\s()-]{6,}$/;

export const AGENT_INTERFACE_LANGUAGES = ['en', 'zh_CN', 'vi', 'ko'] as const;

export const DEFAULT_INTERFACE_LANGUAGE: AgentInterfaceLanguage = 'en';

export const AGENT_LANGUAGE_TO_LOCALE: Record<AgentInterfaceLanguage, string> = {
  en: 'en',
  zh_CN: 'zh',
  vi: 'vi',
  ko: 'ko',
};

export const AGENT_DATE_FORMATS = [
  'DD_MMM_YYYY',
  'MMM_DD_YYYY',
  'YYYY_MM_DD',
] as const;

export const DEFAULT_DATE_FORMAT: AgentDateFormat = 'DD_MMM_YYYY';

export const AGENT_TIMEZONES = [
  'Australia/Sydney',
  'Australia/Melbourne',
  'Australia/Brisbane',
  'Australia/Perth',
  'Australia/Adelaide',
  'Asia/Singapore',
  'Asia/Kuala_Lumpur',
  'Asia/Bangkok',
  'Asia/Ho_Chi_Minh',
  'Asia/Seoul',
  'Asia/Shanghai',
  'UTC',
] as const;

export const DEFAULT_TIMEZONE = 'Australia/Sydney';

export const AGENT_NOTIFICATION_EVENTS = [
  'applicationStatus',
  'newMessage',
  'documentRequest',
  'offerReceived',
  'testResults',
] as const satisfies readonly AgentNotificationEvent[];

export const AGENT_NOTIFICATION_DIGESTS = [
  'instant',
  'daily',
  'weekly',
] as const;

export const DEFAULT_NOTIFICATION_DIGEST: AgentNotificationDigest = 'instant';
