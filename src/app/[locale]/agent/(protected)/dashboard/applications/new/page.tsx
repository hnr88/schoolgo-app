import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Applications' });
  return { title: t('addApplication') };
}

export default async function NewApplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Applications' });

  return (
    <div className='flex flex-col items-center justify-center py-24 text-center'>
      <p className='text-lg font-semibold text-ink-900'>{t('addApplication')}</p>
      <p className='mt-2 text-sm text-foggy'>Coming soon</p>
    </div>
  );
}
