import type { SchoolSettingsLocale } from '@/modules/school-settings/types/school-settings.types';

export const SCHOOL_SETTINGS_LOCALES = ['en', 'ko', 'ms', 'th', 'vi', 'zh'] as const;

export const DEFAULT_SCHOOL_SETTINGS_LOCALE: SchoolSettingsLocale = 'en';

export const SCHOOL_PASSWORD_MIN_LENGTH = 8;
