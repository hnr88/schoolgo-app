import type { SettingsLocale } from '@/modules/parent-settings/types/parent-settings.types';

export const SETTINGS_LOCALES = ['en', 'ko', 'ms', 'th', 'vi', 'zh'] as const;

export const DEFAULT_SETTINGS_LOCALE: SettingsLocale = 'en';

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_HAS_LETTER = /[A-Za-z]/;

export const PASSWORD_HAS_NUMBER = /\d/;

export const PHONE_PATTERN = /^\+?[\d\s()-]{6,}$/;
