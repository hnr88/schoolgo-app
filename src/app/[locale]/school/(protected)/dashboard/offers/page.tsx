import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolOffersPage } from '@/modules/school-offers';
import { PageHeader } from '@/modules/dashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolOffers' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SchoolOffers' });
  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('title')} description={t('subtitle')} />
      <SchoolOffersPage />
    </div>
  );
}
