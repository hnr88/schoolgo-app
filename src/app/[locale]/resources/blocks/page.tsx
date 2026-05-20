import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentBlocksGalleryPage } from '@/modules/content-blocks';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Reusable Content Blocks | SchoolGo',
    description: 'A visible library of reusable SchoolGo content blocks.',
    alternates: {
      canonical: getCanonicalPath('/resources/blocks', locale),
      languages: getAlternateLanguages('/resources/blocks'),
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
