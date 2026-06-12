import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { AgentDetailPage, buildAgentMetadata, getAgentBySlug } from '@/modules/agent-detail';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return {};
  return buildAgentMetadata(agent, 'agent', locale);
}

export default async function AgentPortalAgentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ school?: string }>;
}) {
  const [{ locale, slug }, { school }] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);

  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  return (
    <AgentDetailPage
      agent={agent}
      activePortal="agent"
      locale={locale}
      schoolDocumentId={school}
    />
  );
}
