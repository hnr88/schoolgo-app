import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentDesignGalleryPage, contentPageDesigns } from '@/modules/content-blocks';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Content Page Designs | SchoolGo',
    description: `${contentPageDesigns.length} SchoolGo page designs composed from reusable content blocks.`,
    alternates: {
      canonical: getCanonicalPath('/resources/designs', locale),
      languages: getAlternateLanguages('/resources/designs'),
    },
  };
}

export default async function ResourceDesignsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContentDesignGalleryPage />;
}
