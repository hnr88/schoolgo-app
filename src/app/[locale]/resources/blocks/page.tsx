import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentBlocksGalleryPage } from '@/modules/content-blocks';

const title = 'Reusable Content Blocks | SchoolGo';
const description = 'A visible library of reusable SchoolGo content blocks.';
const image = '/images/auth/school.jpg';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: getCanonicalPath('/resources/blocks', locale),
      languages: getAlternateLanguages('/resources/blocks'),
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

export default async function ResourceBlocksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContentBlocksGalleryPage />;
}
