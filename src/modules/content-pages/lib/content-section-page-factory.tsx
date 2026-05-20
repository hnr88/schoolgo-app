import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ContentSectionIndexPage } from '@/modules/content-pages/components/ContentSectionIndexPage';
import { ContentStandalonePage } from '@/modules/content-pages/components/ContentStandalonePage';
import {
  getContentDefaultCanonical,
  getContentDefaultLanguages,
  getContentPageMetadata,
} from '@/modules/content-pages/lib/content-page-metadata';
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
import type {
  ContentSectionIndexProps,
  ContentSectionPageProps,
  ContentSectionRoute,
} from '@/modules/content-pages/types/content-section-routes.types';

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
  }: ContentSectionPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const page = getContentSectionPage(section, slug);
    if (!page) return {};

    const path = getContentSectionPageHref(page);
    return getContentPageMetadata({ page, path, locale, type: 'article' });
  };
}

export function createContentSectionPage(section: ContentSectionRoute) {
  return async function ContentSectionPage({ params }: ContentSectionPageProps) {
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
  }: ContentSectionIndexProps): Promise<Metadata> {
    await params;
    const title = getContentSectionLabel(section);
    const description = getContentSectionDescription(section);
    const path = getContentSectionRootHref(section);

    return {
      title: `${title} Examples | SchoolGo`,
      description,
      alternates: {
        canonical: getContentDefaultCanonical(path),
        languages: getContentDefaultLanguages(path),
      },
      openGraph: {
        title: `${title} Examples | SchoolGo`,
        description,
        type: 'website',
        images: [{ url: '/images/auth/school.jpg', width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} Examples | SchoolGo`,
        description,
        images: ['/images/auth/school.jpg'],
      },
    };
  };
}

export function createContentSectionIndexPage(section: ContentSectionRoute) {
  return async function ContentSectionIndexRoute({ params }: ContentSectionIndexProps) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ContentSectionIndexPage section={section} />;
  };
}
