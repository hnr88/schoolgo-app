import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolApplicationListPage } from '@/modules/school-applications';
import { PageHeader } from '@/modules/dashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolApplications' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function SchoolApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SchoolApplications' });
  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('title')} description={t('subtitle')} />
      <SchoolApplicationListPage />
    </div>
  );
}
