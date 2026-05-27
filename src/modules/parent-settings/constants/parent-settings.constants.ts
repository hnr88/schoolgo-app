import type { SettingsLocale } from '@/modules/parent-settings/types/parent-settings.types';

export const SETTINGS_LOCALES = ['en', 'ko', 'ms', 'th', 'vi', 'zh'] as const;

export const DEFAULT_SETTINGS_LOCALE: SettingsLocale = 'en';

export const PASSWORD_MIN_LENGTH = 6;
