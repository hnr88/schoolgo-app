import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { ContentStandalonePage, getContentPage } from '@/modules/content-pages';

const slug = 'admissions-hub-australian-schools';
const path = '/admissions';

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

export default async function AdmissionsPage({
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
