import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ParentReviewsPage } from '@/modules/parent-school-reviews';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ParentReviews' });
  return { title: t('title') };
}

export default async function ParentReviewsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ParentReviews');

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex flex-col gap-2'>
        <h1 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h1>
        <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
      </header>

      <ParentReviewsPage />
    </div>
  );
}
