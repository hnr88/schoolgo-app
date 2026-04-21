import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import {
  ParentsArticles,
  ParentsComparison,
  ParentsFaq,
  ParentsFinalCta,
  ParentsFourSteps,
  ParentsHero,
  ParentsStatsBar,
  ParentsPickATest,
  ParentsSevenLanguages,
  ParentsVerified,
} from '@/modules/parents-landing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentsMetadata' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/' },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ParentsLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingHeader />
      <main>
        <ParentsHero />
        <ParentsStatsBar />
        <ParentsFourSteps />
        <ParentsVerified />
        <ParentsComparison />
        <ParentsPickATest />
        <ParentsSevenLanguages />
        <ParentsArticles />
        <ParentsFaq />
        <ParentsFinalCta />
      </main>
      <MarketingFooter />
    </>
  );
}
