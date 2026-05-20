import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ContentStandalonePage } from '@/modules/content-pages/components/ContentStandalonePage';
import { getContentPageMetadata } from '@/modules/content-pages/lib/content-page-metadata';
import { getContentSectionCategoryHref } from '@/modules/content-pages/lib/content-section-routes';
import {
  getContentStaticPage,
  getContentStaticPageHref,
  getContentStaticRootHref,
  withContentStaticLinks,
} from '@/modules/content-pages/lib/content-static-routes';
import type {
  ContentStaticPageProps,
  ContentStaticRoute,
} from '@/modules/content-pages/types/content-static-routes.types';

export function createContentStaticGenerateMetadata(route: ContentStaticRoute) {
  return async function generateMetadata({
    params,
  }: ContentStaticPageProps): Promise<Metadata> {
    const { locale } = await params;
    const page = getContentStaticPage(route);
    if (!page) return {};

    const path = getContentStaticRootHref(route);
    return getContentPageMetadata({ page, path, locale, type: 'article' });
  };
}

export function createContentStaticPage(route: ContentStaticRoute) {
  return async function ContentStaticPage({ params }: ContentStaticPageProps) {
    const { locale } = await params;
    const page = getContentStaticPage(route);
    if (!page) notFound();
    setRequestLocale(locale);

    return (
      <ContentStandalonePage
        page={withContentStaticLinks(page)}
        getPageHref={getContentStaticPageHref}
        getCategoryHref={getContentSectionCategoryHref}
        sectionLabel={page.eyebrow}
      />
    );
  };
}
