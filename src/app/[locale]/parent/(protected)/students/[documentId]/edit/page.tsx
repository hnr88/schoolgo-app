import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EditStudentPage } from '@/modules/students';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'StudentWizard' });
  return { title: t('editTitle') };
}

export default async function ParentEditStudentPage({
  params,
}: {
  params: Promise<{ locale: string; documentId: string }>;
}) {
  const { locale, documentId } = await params;
  setRequestLocale(locale);

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-6 xl:max-w-7xl'>
      <EditStudentPage documentId={documentId} />
    </div>
  );
}
