import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/lib/seo';
import { SearchPageContent } from '@/modules/school-search/components/SearchPageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SearchMetadata' });
  return {
    title: t('schoolTitle'),
    description: t('schoolDescription'),
    alternates: {
      canonical: getCanonicalPath('/school/search', locale),
      languages: getAlternateLanguages('/school/search'),
    },
    openGraph: {
      title: t('schoolTitle'),
      description: t('schoolOgDescription'),
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SearchMetadata' });
  return <SearchPageContent activePortal="school" title={t('schoolTitle')} />;
}
