import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentPageView, contentSlugs, getContentPage } from '@/modules/content-pages';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return contentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getContentPage(slug);
  if (!page) return {};

  const path = `/resources/${slug}`;
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
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const page = getContentPage(slug);
  if (!page) notFound();
  setRequestLocale(locale);

  return <ContentPageView page={page} />;
}
