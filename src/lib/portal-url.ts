export type Portal = 'parent' | 'agent' | 'school';

const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'localhost:3000';

function protocol(): string {
  return baseDomain.startsWith('localhost') ? 'http' : 'https';
}

function buildUrl(subdomain?: string): string {
  return subdomain
    ? `${protocol()}://${subdomain}.${baseDomain}`
    : `${protocol()}://${baseDomain}`;
}

const DEFAULT_LOCALE = 'en';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? buildUrl();

export function portalUrl(portal: Portal, locale?: string): string {
  let base: string;

  switch (portal) {
    case 'parent':
      base = process.env.NEXT_PUBLIC_PARENT_URL ?? buildUrl();
      break;
    case 'agent':
      base = process.env.NEXT_PUBLIC_AGENT_URL ?? buildUrl('agent');
      break;
    case 'school':
      base = process.env.NEXT_PUBLIC_SCHOOL_URL ?? buildUrl('school');
      break;
  }

  if (locale && locale !== DEFAULT_LOCALE) {
    return `${base}/${locale}`;
  }
  return base;
}
