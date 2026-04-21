import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import {
  AgentsCommission,
  AgentsFinalCta,
  AgentsHero,
  AgentsMatching,
  AgentsPainPoints,
  AgentsQeacTrust,
  AgentsScale,
  AgentsTestimonial,
} from '@/modules/agents-landing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AgentsMetadata' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/agents' },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function AgentsLandingPage({
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
        <AgentsHero />
        <AgentsPainPoints />
        <AgentsMatching />
        <AgentsCommission />
        <AgentsQeacTrust />
        <AgentsScale />
        <AgentsTestimonial />
        <AgentsFinalCta />
      </main>
      <MarketingFooter />
    </>
  );
}
