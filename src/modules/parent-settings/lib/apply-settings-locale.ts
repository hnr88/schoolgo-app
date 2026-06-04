import { env } from '@/lib/env';
import type { SettingsLocale } from '@/modules/parent-settings/types/parent-settings.types';

export function persistLocaleCookie(locale: SettingsLocale): void {
  if (typeof document === 'undefined') return;

  const baseDomain = env.NEXT_PUBLIC_BASE_DOMAIN ?? '';
  const cookieDomain = baseDomain.split(':')[0];
  const domainAttr =
    cookieDomain && cookieDomain !== 'localhost' ? `; domain=.${cookieDomain}` : '';

  Reflect.set(
    document,
    'cookie',
    `NEXT_LOCALE=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax${domainAttr}`,
  );
}
