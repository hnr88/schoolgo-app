import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ParentApplicationDetailPage } from '@/modules/applications';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentApplications' });
  return { title: t('detailTitle') };
}

export default async function ParentApplicationDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; documentId: string }>;
}) {
  const { locale, documentId } = await params;
  setRequestLocale(locale);

  return <ParentApplicationDetailPage documentId={documentId} />;
}
