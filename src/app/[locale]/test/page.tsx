import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TestLanding } from '@/modules/test-runner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TestRunner' });
  return { title: t('pageTitle'), robots: { index: false } };
}

export default async function TestLandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; test?: string }>;
}) {
  const { locale } = await params;
  const { token, test } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('TestRunner');

  return (
    <main
      id='main-content'
      className='flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/40 px-4 py-12'
    >
      <header className='flex flex-col items-center gap-1 text-center'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('pageTitle')}</h1>
        <p className='text-sm text-muted-foreground'>{t('pageSubtitle')}</p>
      </header>
      <TestLanding token={token} testDocumentId={test} />
    </main>
  );
}
