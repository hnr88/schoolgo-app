import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TestResultsPanel } from '@/modules/test-results';

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
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('agentSubtitle')}</p>
      </header>

      <TestResultsPanel studentDocumentId={student} portal='agent' />
    </div>
  );
}
