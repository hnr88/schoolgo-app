import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import {
  ContentDesignPageView,
  contentPageDesignSlugs,
  getContentPageDesign,
} from '@/modules/content-blocks';
import { getContentPage } from '@/modules/content-pages';

interface PageProps {
  params: Promise<{ locale: string; design: string }>;
}

export function generateStaticParams() {
  return contentPageDesignSlugs.map((design) => ({ design }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, design } = await params;
  const pageDesign = getContentPageDesign(design);
  if (!pageDesign) return {};
  const path = `/resources/designs/${design}`;
  return {
    title: `${pageDesign.name} Design | SchoolGo`,
    description: pageDesign.description,
    alternates: {
      canonical: getCanonicalPath(path, locale),
      languages: getAlternateLanguages(path),
    },
  };
}

export default async function ResourceDesignPage({ params }: PageProps) {
  const { locale, design } = await params;
  const pageDesign = getContentPageDesign(design);
  if (!pageDesign) notFound();
  const page = getContentPage(pageDesign.samplePageSlug);
  if (!page) notFound();
  setRequestLocale(locale);

  return <ContentDesignPageView design={pageDesign} page={page} />;
}
