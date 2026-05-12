import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { SearchPageContent } from '@/modules/school-search/components/SearchPageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SearchMetadata' });
  return {
    title: t('parentTitle'),
    description: t('parentDescription'),
    alternates: {
      canonical: getCanonicalPath('/search', locale),
      languages: getAlternateLanguages('/search'),
    },
    openGraph: {
      title: t('parentTitle'),
      description: t('parentOgDescription'),
      type: 'website',
      images: [
        {
          url: '/logos/logo-red.png',
          width: 1200,
          height: 630,
          alt: t('parentTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/logos/logo-red.png'],
    },
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
  return (
    <SearchPageContent activePortal='parent' title={t('parentTitle')} guestAccess specOnly />
  );
}
