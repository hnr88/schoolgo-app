import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AgentEditStudentPage } from '@/modules/students/components/AgentEditStudentPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Students' });
  return { title: t('editTitle') };
}

export default async function EditStudentRoute({
  params,
}: {
  params: Promise<{ locale: string; documentId: string }>;
}) {
  const { locale, documentId } = await params;
  setRequestLocale(locale);
  return <AgentEditStudentPage documentId={documentId} />;
}
