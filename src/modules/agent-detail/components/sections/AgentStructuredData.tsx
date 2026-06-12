import 'server-only';
import { portalUrl } from '@/lib/portal-url';
import type { Portal } from '@/lib/portal-url';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';
import type { AgentStructuredDataProps } from '@/modules/agent-detail/types/structured-data.types';

function safeJson(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function resolveName(agent: AgentDetail): string {
  return agent.displayName || agent.tradingName || agent.companyName || agent.contactName;
}

function profileUrl(agent: AgentDetail, portal: Portal, locale?: string): string {
  const base = portalUrl(portal, locale);
  const segment = portal === 'parent' ? `/agents/${agent.slug}` : `/${portal}/agents/${agent.slug}`;
  return `${base}${segment}`;
}

function personLd(agent: AgentDetail, url: string): Record<string, unknown> {
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: agent.contactName || resolveName(agent),
    url,
  };
  if (agent.roleTitle) obj.jobTitle = agent.roleTitle;
  const image = mediaUrl(agent.photoUrl);
  if (image) obj.image = image;
  if (agent.companyName) {
    obj.worksFor = { '@type': 'Organization', name: agent.companyName };
  }
  return obj;
}

function professionalServiceLd(agent: AgentDetail, url: string): Record<string, unknown> {
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: resolveName(agent),
    url,
    serviceType: 'Education agent',
  };
  if (agent.headline || agent.tagline) obj.slogan = agent.headline ?? agent.tagline;
  if (agent.publicSummary) obj.description = agent.publicSummary;
  const logo = mediaUrl(agent.photoUrl);
  if (logo) obj.image = logo;
  if (agent.website) obj.sameAs = agent.website;
  if (agent.countryOfOperation) {
    obj.areaServed = { '@type': 'Country', name: agent.countryOfOperation };
  }
  const office = agent.sections.officeLocations?.[0];
  if (office) {
    obj.address = {
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress ?? '',
      addressLocality: office.city ?? office.suburb ?? '',
      addressRegion: office.state ?? '',
      addressCountry: office.country ?? '',
    };
  }
  const metrics = agent.sections.successMetrics;
  if (metrics?.googleRating != null && metrics.googleReviewCount != null) {
    obj.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: metrics.googleRating,
      reviewCount: metrics.googleReviewCount,
    };
  }
  return obj;
}

function breadcrumbLd(agent: AgentDetail, portal: Portal, locale?: string): Record<string, unknown> {
  const base = portalUrl(portal, locale);
  const homePath = portal === 'parent' ? '' : `/${portal}`;
  const agentsPath = portal === 'parent' ? '/find-an-agent' : `/${portal}/agents`;
  const li = (position: number, name: string, item?: string): Record<string, unknown> =>
    item ? { '@type': 'ListItem', position, name, item } : { '@type': 'ListItem', position, name };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      li(1, 'Home', `${base}${homePath}`),
      li(2, 'Agents', `${base}${agentsPath}`),
      li(3, resolveName(agent)),
    ],
  };
}

export async function AgentStructuredData({ agent, activePortal, locale }: AgentStructuredDataProps) {
  const url = profileUrl(agent, activePortal, locale);
  const schemas: Record<string, unknown>[] = [
    personLd(agent, url),
    professionalServiceLd(agent, url),
    breadcrumbLd(agent, activePortal, locale),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(schema) }}
        />
      ))}
    </>
  );
}
