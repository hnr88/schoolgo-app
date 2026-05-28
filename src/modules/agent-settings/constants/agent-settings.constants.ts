import type {
  AgentDateFormat,
  AgentInterfaceLanguage,
  AgentNotificationDigest,
  AgentNotificationEvent,
} from '@/modules/agent-settings/types/agent-settings.types';

export const PASSWORD_MIN_LENGTH = 6;

export const AGENT_INTERFACE_LANGUAGES = ['en', 'zh_CN', 'vi', 'ko'] as const;

export const DEFAULT_INTERFACE_LANGUAGE: AgentInterfaceLanguage = 'en';

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
