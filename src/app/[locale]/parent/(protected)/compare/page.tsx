import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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

export default async function ParentComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='flex flex-col gap-6'>
      <SchoolComparePage />
    </div>
  );
}
