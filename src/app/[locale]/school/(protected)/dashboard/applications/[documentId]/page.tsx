import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolApplicationDetailPage } from '@/modules/school-applications';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolApplications' });
  return { title: t('detailTitle') };
}

export default async function SchoolApplicationDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; documentId: string }>;
}) {
  const { locale, documentId } = await params;
  setRequestLocale(locale);
  return <SchoolApplicationDetailPage documentId={documentId} />;
}
