import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolCapacityPlannerPage } from '@/modules/school-capacity-planner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolCapacityPlanner' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function SchoolCapacityPlannerRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SchoolCapacityPlannerPage />;
}
