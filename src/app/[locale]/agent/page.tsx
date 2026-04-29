import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/lib/seo';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { AuthRedirectCheck } from '@/modules/auth/components/AuthRedirectCheck';
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
    alternates: {
      canonical: getCanonicalPath('/agent', locale),
      languages: getAlternateLanguages('/agent'),
    },
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
    <AuthRedirectCheck portal="agent">
      <MarketingHeader activePortal="agent" />
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
      <MarketingFooter activePortal="agent" />
    </AuthRedirectCheck>
  );
}
