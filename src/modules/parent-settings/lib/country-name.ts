import { COUNTRY_CODES } from '@/modules/parent-settings/constants/parent-settings.constants';

const displayNamesByLocale = new Map<string, Intl.DisplayNames>();

function getDisplayNames(locale: string): Intl.DisplayNames {
  const key = locale || 'en';
  let instance = displayNamesByLocale.get(key);
  if (!instance) {
    instance = new Intl.DisplayNames([key], { type: 'region' });
    displayNamesByLocale.set(key, instance);
  }
  return instance;
}

/** Localised country name for an ISO 3166-1 alpha-2 code, e.g. ('MY', 'en') -> 'Malaysia'. */
export function getCountryName(code: string, locale: string): string {
  try {
    return getDisplayNames(locale).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

/** Country select options ({ value: code, label: localised name }) sorted by localised name. */
export function getCountryOptions(locale: string): { value: string; label: string }[] {
  return COUNTRY_CODES.map((code) => ({ value: code, label: getCountryName(code, locale) })).sort(
    (a, b) => a.label.localeCompare(b.label, locale || 'en'),
  );
}
