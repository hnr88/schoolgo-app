import {
  contentStaticRouteMap,
  contentStaticRoutes,
} from '@/modules/content-pages/constants/content-static-routes.constants';
import { getContentPage } from '@/modules/content-pages/data/content-pages';
import {
  getContentSectionCategoryHref,
  getContentSectionPageHrefBySlug,
} from '@/modules/content-pages/lib/content-section-routes';
import type {
  ContentLink,
  ContentPage,
} from '@/modules/content-pages/types/content-pages.types';
import type { ContentStaticRoute } from '@/modules/content-pages/types/content-static-routes.types';

const staticEntries = Object.entries(contentStaticRouteMap) as Array<
  [ContentStaticRoute, string]
>;

const staticRouteBySlug = new Map<string, ContentStaticRoute>(
  staticEntries.map(([route, slug]) => [slug, route]),
);

export function getContentStaticRootHref(route: ContentStaticRoute) {
  return `/${route}`;
}

export function getContentStaticPage(route: ContentStaticRoute) {
  return getContentPage(contentStaticRouteMap[route]);
}

export function getContentStaticPageHref(page: ContentPage) {
  return getContentStaticPageHrefBySlug(page.slug);
}

export function getContentStaticPageHrefBySlug(slug: string) {
  const route = staticRouteBySlug.get(slug);
  return route
    ? getContentStaticRootHref(route)
    : getContentSectionPageHrefBySlug(slug);
}

function rewriteContentStaticHref(href: string) {
  const categoryPrefix = '/resources/category/';
  if (href.startsWith(categoryPrefix)) {
    return getContentSectionCategoryHref(href.slice(categoryPrefix.length));
  }

  const resourcePrefix = '/resources/';
  if (href.startsWith(resourcePrefix)) {
    return getContentStaticPageHrefBySlug(href.slice(resourcePrefix.length));
  }

  return href;
}

function rewriteOptionalHref<T extends { href?: string }>(item: T): T {
  if (!item.href) return item;
  return { ...item, href: rewriteContentStaticHref(item.href) };
}

function rewriteLink(link: ContentLink): ContentLink {
  return { ...link, href: rewriteContentStaticHref(link.href) };
}

export function isContentStaticPath(path: string) {
  return contentStaticRoutes.includes(path as ContentStaticRoute);
}

export function withContentStaticLinks(page: ContentPage): ContentPage {
  return {
    ...page,
    features: page.features.map(rewriteOptionalHref),
    steps: page.steps.map(rewriteOptionalHref),
    timeline: page.timeline.map(rewriteOptionalHref),
    checklist: page.checklist.map(rewriteOptionalHref),
    resources: page.resources.map((resource) => ({
      ...resource,
      href: rewriteContentStaticHref(resource.href),
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
      href: rewriteContentStaticHref(stakeholder.href),
    })),
    actionPaths: page.actionPaths.map((path) => ({
      ...path,
      href: rewriteContentStaticHref(path.href),
    })),
    cta: {
      ...page.cta,
      primary: rewriteLink(page.cta.primary),
      secondary: rewriteLink(page.cta.secondary),
    },
  };
}
