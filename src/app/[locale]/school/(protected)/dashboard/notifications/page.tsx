import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NotificationsListPage } from '@/modules/notifications';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SchoolNotifications' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function SchoolNotificationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='flex flex-col gap-6'>
      <NotificationsListPage />
    </div>
  );
}
