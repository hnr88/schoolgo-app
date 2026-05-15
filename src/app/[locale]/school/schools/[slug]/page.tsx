import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildSchoolMetadata, getSchoolBySlug, SchoolDetailPage } from '@/modules/school-detail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) return {};
  return buildSchoolMetadata(school, 'school', locale);
}

export default async function SchoolPortalSchoolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const school = await getSchoolBySlug(slug);
  if (!school) notFound();

  return <SchoolDetailPage school={school} activePortal="school" locale={locale} />;
}
