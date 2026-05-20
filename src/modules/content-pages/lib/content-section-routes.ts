import {
  contentSectionDescriptions,
  contentSectionLabels,
  contentSectionRouteMap,
  contentSectionRoutes,
} from '@/modules/content-pages/constants/content-section-routes.constants';
import { getContentPage } from '@/modules/content-pages/data/content-pages';
import type {
  ContentLink,
  ContentPage,
} from '@/modules/content-pages/types/content-pages.types';
import type { ContentSectionRoute } from '@/modules/content-pages/types/content-section-routes.types';

const sectionEntries = Object.entries(contentSectionRouteMap) as Array<
  [ContentSectionRoute, readonly string[]]
>;

const sectionBySlug = new Map<string, ContentSectionRoute>(
  sectionEntries.flatMap(([section, slugs]) =>
    slugs.map((slug) => [slug, section] as const),
  ),
);

const categorySectionAliases: Record<string, ContentSectionRoute> = {
  agents: 'partners',
  schools: 'school-solutions',
};

function isContentSectionRoute(value: string): value is ContentSectionRoute {
  return contentSectionRoutes.includes(value as ContentSectionRoute);
}

function rewriteContentHref(href: string) {
  const categoryPrefix = '/resources/category/';
  if (href.startsWith(categoryPrefix)) {
    const categorySlug = href.slice(categoryPrefix.length);
    return getContentSectionCategoryHref(categorySlug);
  }

  const resourcePrefix = '/resources/';
  if (href.startsWith(resourcePrefix)) {
    const slug = href.slice(resourcePrefix.length);
    return getContentSectionPageHrefBySlug(slug);
  }

  return href;
}

function rewriteOptionalHref<T extends { href?: string }>(item: T): T {
  if (!item.href) return item;
  return { ...item, href: rewriteContentHref(item.href) };
}

function rewriteLink(link: ContentLink): ContentLink {
  return { ...link, href: rewriteContentHref(link.href) };
}

export function getContentSectionLabel(section: ContentSectionRoute) {
  return contentSectionLabels[section];
}

export function getContentSectionDescription(section: ContentSectionRoute) {
  return contentSectionDescriptions[section];
}

export function getContentSectionRootHref(section: ContentSectionRoute) {
  return `/${section}`;
}

export function getContentSectionForSlug(slug: string) {
  return sectionBySlug.get(slug);
}

export function getContentSectionPageHref(page: ContentPage) {
  return getContentSectionPageHrefBySlug(page.slug);
}

export function getContentSectionPageHrefBySlug(slug: string) {
  const section = getContentSectionForSlug(slug);
  return section ? `/${section}/${slug}` : `/resources/${slug}`;
}

export function getContentSectionCategoryHref(categorySlug: string) {
  const section = isContentSectionRoute(categorySlug)
    ? categorySlug
    : categorySectionAliases[categorySlug];

  return section
    ? getContentSectionRootHref(section)
    : `/resources/category/${categorySlug}`;
}

export function getContentSectionPages(section: ContentSectionRoute) {
  return contentSectionRouteMap[section]
    .map((slug) => getContentPage(slug))
    .filter((page): page is ContentPage => Boolean(page));
}

export function getContentSectionPage(
  section: ContentSectionRoute,
  slug: string,
) {
  const slugs: readonly string[] = contentSectionRouteMap[section];
  if (!slugs.includes(slug)) return undefined;
  return getContentPage(slug);
}

export function getContentSectionStaticParams(section: ContentSectionRoute) {
  return contentSectionRouteMap[section].map((slug) => ({ slug }));
}

export function withContentSectionLinks(page: ContentPage): ContentPage {
  return {
    ...page,
    features: page.features.map(rewriteOptionalHref),
    steps: page.steps.map(rewriteOptionalHref),
    timeline: page.timeline.map(rewriteOptionalHref),
    checklist: page.checklist.map(rewriteOptionalHref),
    resources: page.resources.map((resource) => ({
      ...resource,
      href: rewriteContentHref(resource.href),
    })),
    links: page.links.map(rewriteLink),
    decisionPoints: page.decisionPoints.map(rewriteOptionalHref),
    aiSummary: {
      ...page.aiSummary,
      followUps: page.aiSummary.followUps.map(rewriteLink),
    },
    proofPoints: page.proofPoints.map(rewriteOptionalHref),
    stakeholders: page.stakeholders.map((stakeholder) => ({
      ...stakeholder,
      href: rewriteContentHref(stakeholder.href),
    })),
    actionPaths: page.actionPaths.map((path) => ({
      ...path,
      href: rewriteContentHref(path.href),
    })),
    cta: {
      ...page.cta,
      primary: rewriteLink(page.cta.primary),
      secondary: rewriteLink(page.cta.secondary),
    },
  };
}
