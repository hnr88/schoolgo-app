import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/lib/seo';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { AuthRedirectCheck } from '@/modules/auth/components/AuthRedirectCheck';
import {
  SchoolsFaq,
  SchoolsFinalCta,
  SchoolsHero,
  SchoolsPricing,
  SchoolsStats,
  SchoolsTestimonial,
  SchoolsThreeTools,
  SchoolsTimeline,
} from '@/modules/schools-landing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolsMetadata' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getCanonicalPath('/school', locale),
      languages: getAlternateLanguages('/school'),
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function SchoolsLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AuthRedirectCheck portal="school">
      <MarketingHeader activePortal="school" />
      <main>
        <SchoolsHero />
        <SchoolsStats />
        <SchoolsThreeTools />
        <SchoolsTimeline />
        <SchoolsPricing />
        <SchoolsTestimonial />
        <SchoolsFaq />
        <SchoolsFinalCta />
      </main>
      <MarketingFooter activePortal="school" />
    </AuthRedirectCheck>
  );
}
