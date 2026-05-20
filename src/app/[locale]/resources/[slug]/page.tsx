import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import {
  ContentPageView,
  contentSlugs,
  getContentPage,
  getContentPageMetadata,
  getContentStaticPageHrefBySlug,
} from '@/modules/content-pages';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return contentSlugs
    .filter((slug) => getContentStaticPageHrefBySlug(slug) === `/resources/${slug}`)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getContentPage(slug);
  if (!page) return {};

  const path = getContentStaticPageHrefBySlug(slug);
  return getContentPageMetadata({ page, path, locale, type: 'article' });
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const page = getContentPage(slug);
  if (!page) notFound();
  const canonicalPath = getContentStaticPageHrefBySlug(slug);
  if (canonicalPath !== `/resources/${slug}`) redirect({ href: canonicalPath, locale });
  setRequestLocale(locale);

  return <ContentPageView page={page} />;
}
