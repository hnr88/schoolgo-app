import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TestResultsPanel } from '@/modules/test-results';
import { PageHeader } from '@/modules/dashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentTestResults' });
  return { title: t('title') };
}

export default async function AgentTestResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ student?: string }>;
}) {
  const { locale } = await params;
  const { student } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('ParentTestResults');

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('title')} description={t('agentSubtitle')} />

      <TestResultsPanel studentDocumentId={student} portal='agent' />
    </div>
  );
}
