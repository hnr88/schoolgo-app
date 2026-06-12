import type { Portal } from '@/lib/portal-url';

export function portalAgentProfilePath(portal: Portal, slug: string): string {
  return `/${portal}/agents/${slug}`;
}
