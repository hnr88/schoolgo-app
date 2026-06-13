import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolReputationPage } from '@/modules/school-reputation';
import { PageHeader } from '@/modules/dashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolReputation' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ReputationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SchoolReputation' });
  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('title')} description={t('subtitle')} />
      <SchoolReputationPage />
    </div>
  );
}
