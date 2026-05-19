import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentIndexPage } from '@/modules/content-pages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'SchoolGo Resource Page Examples | SchoolGo',
    description:
      'Browse 60 example SchoolGo content pages for admissions, fees, curriculum, boarding, events, agents, schools, and company content.',
    alternates: {
      canonical: getCanonicalPath('/resources', locale),
      languages: getAlternateLanguages('/resources'),
    },
    openGraph: {
      title: 'SchoolGo Resource Page Examples | SchoolGo',
      description: 'Browse reusable SchoolGo content page examples.',
      type: 'website',
    },
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContentIndexPage />;
}
