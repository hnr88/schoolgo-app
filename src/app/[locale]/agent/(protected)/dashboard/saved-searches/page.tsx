import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ParentSavedSearchesPage } from '@/modules/school-search';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentSavedSearches' });
  return { title: t('title'), description: t('emptyDescription') };
}

export default async function AgentSavedSearchesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='flex flex-col gap-6'>
      <ParentSavedSearchesPage portal='agent' />
    </div>
  );
}
