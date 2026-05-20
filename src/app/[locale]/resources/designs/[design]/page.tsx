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
  const title = `${pageDesign.name} Design | SchoolGo`;
  const image = '/images/auth/school.jpg';
  return {
    title,
    description: pageDesign.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: getCanonicalPath(path, locale),
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title,
      description: pageDesign.description,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: pageDesign.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: pageDesign.description,
      images: [image],
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
