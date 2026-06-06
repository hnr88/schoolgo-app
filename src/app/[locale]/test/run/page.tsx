import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TestRunnerScreen } from '@/modules/test-runner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TestRunner' });
  return { title: t('runner.pageTitle'), robots: { index: false } };
}

export default async function TestRunnerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ test?: string }>;
}) {
  const { locale } = await params;
  const { test } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('TestRunner');

  return (
    <main
      id='main-content'
      className='flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/40 px-4 py-12'
    >
      <header className='flex flex-col items-center gap-1 text-center'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('runner.pageTitle')}</h1>
        <p className='text-sm text-muted-foreground'>{t('runner.pageSubtitle')}</p>
      </header>
      <TestRunnerScreen testDocumentId={test} />
    </main>
  );
}
