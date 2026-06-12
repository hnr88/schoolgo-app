import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { MarketingHeader } from '@/modules/marketing-layout';
import { UnifiedSearchShell } from '@/modules/unified-search';

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
  return (
    <>
      <h1 className='sr-only'>{t('schoolTitle')}</h1>
      <MarketingHeader activePortal='school' fullWidth />
      <main className='flex w-full bg-muted pt-14 md:pt-18'>
        <UnifiedSearchShell activePortal='school' access='public' defaultMode='schools' />
      </main>
    </>
  );
}
