import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentStandalonePage, getContentPage } from '@/modules/content-pages';

const slug = 'student-life-overview';
const path = '/student-life';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getContentPage(slug);
  return {
    title: `${page.title} | SchoolGo`,
    description: page.description,
    alternates: {
      canonical: getCanonicalPath(path, locale),
      languages: getAlternateLanguages(path),
    },
  };
}

export default async function StudentLifePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getContentPage(slug);
  if (!page) notFound();
  setRequestLocale(locale);

  return <ContentStandalonePage page={page} />;
}
