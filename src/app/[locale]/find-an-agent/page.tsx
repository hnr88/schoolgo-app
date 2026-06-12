import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAlternateLanguages, getCanonicalPath } from '@/modules/seo';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import { SectionContainer } from '@/modules/design-system';
import {
  AgentDirectoryList,
  AgentSearchContent,
  getPublicAgentsInitial,
} from '@/modules/agent-search';

const ROUTE_PATH = '/find-an-agent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SearchMetadata' });
  return {
    title: t('findAgentTitle'),
    description: t('findAgentDescription'),
    alternates: {
      canonical: getCanonicalPath(ROUTE_PATH, locale),
      languages: getAlternateLanguages(ROUTE_PATH),
    },
    openGraph: {
      title: t('findAgentTitle'),
      description: t('findAgentOgDescription'),
      type: 'website',
      images: [
        {
          url: '/logos/logo-red.png',
          width: 1200,
          height: 630,
          alt: t('findAgentTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/logos/logo-red.png'],
    },
  };
}

export default async function FindAnAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'SearchMetadata' });
  const initial = await getPublicAgentsInitial();

  return (
    <>
      <MarketingHeader activePortal='parent' fullWidth />
      <main className='bg-muted pt-14 md:pt-18'>
        <h1 className='sr-only'>{t('findAgentTitle')}</h1>
        <AgentDirectoryList hits={initial.hits} activePortal='parent' locale={locale} />
        <SectionContainer size='wide' className='py-6 md:py-8'>
          <AgentSearchContent activePortal='parent' />
        </SectionContainer>
      </main>
      <MarketingFooter activePortal='parent' />
    </>
  );
}
