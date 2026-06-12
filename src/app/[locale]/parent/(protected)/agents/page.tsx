import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { UnifiedSearchShell } from '@/modules/unified-search';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AgentSearch.header' });
  return { title: t('title') };
}

export default async function ParentAgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <UnifiedSearchShell activePortal='parent' access='authenticated' defaultMode='agents' />
  );
}
