import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentDesignGalleryPage, contentPageDesigns } from '@/modules/content-blocks';

const title = 'Content Page Designs | SchoolGo';
const image = '/images/auth/school.jpg';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description = `${contentPageDesigns.length} SchoolGo page designs composed from reusable content blocks.`;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: getCanonicalPath('/resources/designs', locale),
      languages: getAlternateLanguages('/resources/designs'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
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
