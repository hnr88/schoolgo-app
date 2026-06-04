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
    <div className='flex w-full max-w-6xl flex-col gap-10 rounded-2xl bg-muted p-6 xl:max-w-7xl lg:p-8'>
      <header className='flex flex-col gap-3'>
        <h1 className='font-display text-4xl font-bold tracking-tight text-ink-900'>
          {t('title')}
        </h1>
        <p className='max-w-prose text-base leading-relaxed text-muted-foreground'>
          {t('subtitle')}
        </p>
      </header>

      <ParentStudentWizard />
    </div>
  );
}
