import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SavedSchoolsPage } from '@/modules/school-search';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentSavedSchools' });
  return { title: t('title'), description: t('emptyDescription') };
}

export default async function AgentSavedSchoolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='flex flex-col gap-6'>
      <SavedSchoolsPage portal='agent' />
    </div>
  );
}
