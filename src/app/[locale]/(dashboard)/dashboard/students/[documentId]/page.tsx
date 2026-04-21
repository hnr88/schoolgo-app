import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { StudentProfile } from '@/modules/students/components/StudentProfile';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Students' });
  return { title: t('profileTitle') };
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; documentId: string }>;
}) {
  const { locale, documentId } = await params;
  setRequestLocale(locale);
  return <StudentProfile documentId={documentId} />;
}
