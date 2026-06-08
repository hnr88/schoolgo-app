import type { SettingsLocale } from '@/modules/parent-settings/types/parent-settings.types';

export const SETTINGS_LOCALES = ['en', 'ko', 'ms', 'th', 'vi', 'zh'] as const;

export const DEFAULT_SETTINGS_LOCALE: SettingsLocale = 'en';

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_HAS_LETTER = /[A-Za-z]/;

export const PASSWORD_HAS_NUMBER = /\d/;

export const PHONE_PATTERN = /^\+?[\d\s()-]{6,}$/;

export const PARENT_RELATIONSHIP_OPTIONS = [
  'mother',
  'father',
  'guardian',
  'grandparent',
  'other',
] as const;

export const PARENT_CONTACT_METHOD_OPTIONS = ['email', 'phone', 'whatsapp', 'wechat'] as const;

// ISO 3166-1 alpha-2 codes; display names are resolved per-locale via Intl.DisplayNames
// (see lib/country-name.ts) so no country names are hardcoded.
export const COUNTRY_CODES = [
  'MY', 'SG', 'TH', 'VN', 'ID', 'PH', 'CN', 'HK', 'TW', 'KR',
  'JP', 'IN', 'GB', 'US', 'AU', 'CA', 'NZ', 'AE', 'SA', 'DE',
  'FR', 'NL', 'CH', 'SE', 'KH', 'LA', 'MM', 'BD', 'PK', 'LK',
] as const;
