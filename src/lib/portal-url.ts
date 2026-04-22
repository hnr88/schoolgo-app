export type Portal = 'parent' | 'agent' | 'school';

const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'localhost:3000';
const DEFAULT_LOCALE = 'en';

function protocol(): string {
  return baseDomain.startsWith('localhost') ? 'http' : 'https';
}

export function portalUrl(portal: Portal, locale?: string): string {
  const base =
    portal === 'parent'
      ? `${protocol()}://${baseDomain}`
      : `${protocol()}://${portal}.${baseDomain}`;

  if (locale && locale !== DEFAULT_LOCALE) {
    return `${base}/${locale}`;
  }
  return base;
}
