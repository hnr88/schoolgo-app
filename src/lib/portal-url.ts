export type Portal = 'parent' | 'agent' | 'school';

const PORTAL_URLS: Record<Portal, string> = {
  parent: process.env.NEXT_PUBLIC_PARENT_URL ?? 'http://localhost:3000',
  agent: process.env.NEXT_PUBLIC_AGENT_URL ?? 'http://agent.localhost:3000',
  school: process.env.NEXT_PUBLIC_SCHOOL_URL ?? 'http://school.localhost:3000',
};

const DEFAULT_LOCALE = 'en';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function portalUrl(portal: Portal, locale?: string): string {
  const base = PORTAL_URLS[portal];

  if (locale && locale !== DEFAULT_LOCALE) {
    return `${base}/${locale}`;
  }
  return base;
}
