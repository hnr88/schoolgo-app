import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MarketingHeader } from '@/modules/marketing-layout';
import { SchoolComparePage } from '@/modules/school-comparison';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolComparison' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingHeader activePortal='parent' fullWidth />
      <main className='mx-auto w-full max-w-6xl px-4 pb-16 pt-24 md:px-6'>
        <SchoolComparePage />
      </main>
    </>
  );
}
