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
    <>
      <h1 className='sr-only'>{t('parentTitle')}</h1>
      <MarketingHeader activePortal='parent' fullWidth />
      <main className='flex h-dvh w-full overflow-hidden bg-muted pt-14 md:pt-18'>
        <UnifiedSearchShell activePortal='parent' access='public' defaultMode='schools' />
      </main>
    </>
  );
}
