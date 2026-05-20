import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentSectionIndexPage } from '@/modules/content-pages/components/ContentSectionIndexPage';
import { ContentStandalonePage } from '@/modules/content-pages/components/ContentStandalonePage';
import {
  getContentSectionCategoryHref,
  getContentSectionDescription,
  getContentSectionLabel,
  getContentSectionPage,
  getContentSectionPageHref,
  getContentSectionRootHref,
  getContentSectionStaticParams,
  withContentSectionLinks,
} from '@/modules/content-pages/lib/content-section-routes';
import type { ContentSectionRoute } from '@/modules/content-pages/types/content-section-routes.types';

interface SectionPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface SectionIndexProps {
  params: Promise<{ locale: string }>;
}

export function createContentSectionGenerateStaticParams(
  section: ContentSectionRoute,
) {
  return function generateStaticParams() {
    return getContentSectionStaticParams(section);
  };
}

export function createContentSectionGenerateMetadata(
  section: ContentSectionRoute,
) {
  return async function generateMetadata({
    params,
  }: SectionPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const page = getContentSectionPage(section, slug);
    if (!page) return {};

    const path = getContentSectionPageHref(page);
    return {
      title: `${page.title} | SchoolGo`,
      description: page.description,
      alternates: {
        canonical: getCanonicalPath(path, locale),
        languages: getAlternateLanguages(path),
      },
      openGraph: {
        title: page.title,
        description: page.description,
        type: 'article',
      },
    };
  };
}

export function createContentSectionPage(section: ContentSectionRoute) {
  return async function ContentSectionPage({ params }: SectionPageProps) {
    const { locale, slug } = await params;
    const page = getContentSectionPage(section, slug);
    if (!page) notFound();
    setRequestLocale(locale);

    return (
      <ContentStandalonePage
        page={withContentSectionLinks(page)}
        getPageHref={getContentSectionPageHref}
        getCategoryHref={getContentSectionCategoryHref}
        sectionLabel={getContentSectionLabel(section)}
      />
    );
  };
}

export function createContentSectionIndexGenerateMetadata(
  section: ContentSectionRoute,
) {
  return async function generateMetadata({
    params,
  }: SectionIndexProps): Promise<Metadata> {
    const { locale } = await params;
    const title = getContentSectionLabel(section);
    const description = getContentSectionDescription(section);
    const path = getContentSectionRootHref(section);

    return {
      title: `${title} Examples | SchoolGo`,
      description,
      alternates: {
        canonical: getCanonicalPath(path, locale),
        languages: getAlternateLanguages(path),
      },
      openGraph: {
        title: `${title} Examples | SchoolGo`,
        description,
        type: 'website',
      },
    };
  };
}

export function createContentSectionIndexPage(section: ContentSectionRoute) {
  return async function ContentSectionIndexRoute({ params }: SectionIndexProps) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ContentSectionIndexPage section={section} />;
  };
}
