import { env } from '@/lib/env';
import { AGENT_LANGUAGE_TO_LOCALE } from '@/modules/agent-settings/constants/agent-settings.constants';
import type { AgentInterfaceLanguage } from '@/modules/agent-settings/types/agent-settings.types';

export function resolveInterfaceLocale(language: AgentInterfaceLanguage): string {
  return AGENT_LANGUAGE_TO_LOCALE[language];
}

export function persistLocaleCookie(locale: string): void {
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
