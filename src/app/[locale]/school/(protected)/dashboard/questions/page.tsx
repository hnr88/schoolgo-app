import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolQuestionsInbox } from '@/modules/parent-ask-school';
import { PageHeader } from '@/modules/dashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AskSchool' });
  return { title: t('schoolTitle'), description: t('schoolSubtitle') };
}

export default async function SchoolQuestionsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AskSchool' });

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('schoolTitle')} description={t('schoolSubtitle')} />
      <SchoolQuestionsInbox />
    </div>
  );
}
