import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EnrolmentReadinessPage } from '@/modules/parent-enrolment-readiness';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentEnrolmentReadiness' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ParentEnrolmentReadinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EnrolmentReadinessPage />;
}
