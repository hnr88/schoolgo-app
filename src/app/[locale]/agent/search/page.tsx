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
    title: t('agentTitle'),
    description: t('agentDescription'),
    alternates: {
      canonical: getCanonicalPath('/agent/search', locale),
      languages: getAlternateLanguages('/agent/search'),
    },
    openGraph: {
      title: t('agentTitle'),
      description: t('agentOgDescription'),
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
      <h1 className='sr-only'>{t('agentTitle')}</h1>
      <MarketingHeader activePortal='agent' fullWidth />
      <main className='flex h-dvh w-full overflow-hidden bg-muted pt-14 md:pt-18'>
        <UnifiedSearchShell activePortal='agent' access='public' defaultMode='schools' />
      </main>
    </>
  );
}
