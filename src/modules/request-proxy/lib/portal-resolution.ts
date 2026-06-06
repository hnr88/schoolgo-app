import { env } from '@/lib/env';
import type { RequestPortal } from '@/modules/request-proxy/types/request-proxy.types';

function extractHost(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const agentHost = extractHost(env.NEXT_PUBLIC_AGENT_URL);
const schoolHost = extractHost(env.NEXT_PUBLIC_SCHOOL_URL);
const parentHost = extractHost(env.NEXT_PUBLIC_PARENT_URL);
const knownHosts = new Set<string>(
  [agentHost, schoolHost, parentHost].filter((host): host is string => host !== null),
);

const baseDomain = env.NEXT_PUBLIC_BASE_DOMAIN.split(':')[0];

// The DNS label that identifies the portal for a host, e.g.
// `agent.schoolgo.com.au` (base `schoolgo.com.au`) -> `agent`; the apex itself
// or `www.` -> `null` (treated as parent). Returns null when the host is not a
// subdomain of the base domain at all (custom hosts, previews, IPs).
function leadingLabel(hostname: string): string | null {
  if (!baseDomain || hostname === baseDomain) return null;
  const suffix = `.${baseDomain}`;
  if (!hostname.endsWith(suffix)) return null;
  const prefix = hostname.slice(0, -suffix.length);
  if (prefix === '' || prefix === 'www') return null;
  // The leftmost label identifies the portal, so `agent.staging.<base>` (a
  // preview host) still resolves to the agent portal.
  const labels = prefix.split('.');
  return labels[0] || null;
}

// Resolve the portal for an incoming host. Order:
//   1. exact match against the configured per-portal URLs (most reliable, also
//      covers fully custom hosts that are not subdomains of the base domain);
//   2. the leading subdomain label relative to the base domain (robust for
//      apex/www/preview hosts and when only the base domain is configured);
//   3. parent as the documented default (the parent portal owns the apex).
export function resolvePortal(hostname: string): RequestPortal {
  if (agentHost && hostname === agentHost) return 'agent';
  if (schoolHost && hostname === schoolHost) return 'school';
  if (parentHost && hostname === parentHost) return 'parent';

  const label = leadingLabel(hostname);
  if (label === 'agent') return 'agent';
  if (label === 'school') return 'school';
  return 'parent';
}

export function isTrustedHost(hostname: string): boolean {
  if (knownHosts.size === 0) return true;
  if (knownHosts.has(hostname)) return true;
  return hostname.endsWith('.localhost') || hostname === 'localhost';
}
