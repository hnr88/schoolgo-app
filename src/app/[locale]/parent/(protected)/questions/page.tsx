import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ParentQuestionsPage } from '@/modules/parent-ask-school';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AskSchool' });
  return { title: t('parentTitle'), description: t('parentSubtitle') };
}

export default async function ParentQuestionsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ParentQuestionsPage />;
}
