import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ApplicationDetailPage } from '@/modules/applications/components/ApplicationDetailPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Applications' });
  return { title: t('detailTitle') };
}

export default async function ApplicationDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; documentId: string }>;
}) {
  const { locale, documentId } = await params;
  setRequestLocale(locale);
  return <ApplicationDetailPage documentId={documentId} />;
}
