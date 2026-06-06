import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchoolPayoutsPage } from '@/modules/school-invoices';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolInvoices' });
  return { title: t('payoutsTitle'), description: t('payoutsSubtitle') };
}

export default async function SchoolPayoutsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SchoolInvoices');

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('payoutsTitle')}</h1>
        <p className='text-sm text-muted-foreground'>{t('payoutsSubtitle')}</p>
      </header>

      <SchoolPayoutsPage />
    </div>
  );
}
