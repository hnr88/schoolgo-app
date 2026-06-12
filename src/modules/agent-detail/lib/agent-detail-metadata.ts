import 'server-only';
import type { Metadata } from 'next';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';
import { portalUrl } from '@/lib/portal-url';
import type { Portal } from '@/lib/portal-url';
import { routing } from '@/i18n/routing';

function clamp(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
}

function agentName(agent: AgentDetail): string {
  return agent.displayName || agent.companyName || agent.tradingName || agent.contactName;
}

export function buildAgentMetadata(
  agent: AgentDetail,
  activePortal: Portal,
  locale: string,
): Metadata {
  const name = agentName(agent);
  const baseTitle = `${name} | Verified Education Agent | SchoolGo Australia`;
  const title = clamp(baseTitle, 70);

  const parts: string[] = [];
  if (agent.headline) parts.push(agent.headline);
  else if (agent.tagline) parts.push(agent.tagline);
  parts.push(`${name} helps families place students in Australian schools.`);
  if (agent.countryOfOperation) parts.push(`Based in ${agent.countryOfOperation}`);
  parts.push('SchoolGo Australia.');
  const description = clamp(parts.join(' | '), 160);

  const pathSegment =
    activePortal === 'parent'
      ? `/agents/${agent.slug}`
      : `/${activePortal}/agents/${agent.slug}`;

  const baseUrl = portalUrl(activePortal, locale);
  const canonical = `${baseUrl}${pathSegment}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${portalUrl(activePortal, loc)}${pathSegment}`;
  }

  const imageUrl = mediaUrl(agent.coverPhotoUrl) ?? mediaUrl(agent.photoUrl);
  const images = imageUrl
    ? [{ url: imageUrl, width: 1200, height: 630, alt: name }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'profile',
      title,
      description,
      url: canonical,
      siteName: 'SchoolGo Australia',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: { index: true, follow: true },
  };
}
