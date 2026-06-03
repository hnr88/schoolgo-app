import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ParentStudentWizard } from '@/modules/students';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'StudentWizard' });
  return { title: t('title') };
}

export default async function ParentNewStudentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('StudentWizard');

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-3xl font-bold tracking-tight text-ink-900'>
          {t('title')}
        </h1>
        <p className='max-w-prose text-sm text-muted-foreground'>{t('subtitle')}</p>
      </header>

      <div className='rounded-lg border border-border bg-card p-6 shadow-1 sm:p-8 lg:p-10'>
        <ParentStudentWizard />
      </div>
    </div>
  );
}
