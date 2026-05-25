import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResetPasswordPageContent } from '@/modules/auth/components/ResetPasswordPageContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Auth' });
  return { title: t('resetPasswordTitle'), description: t('resetPasswordSubtitle') };
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { locale } = await params;
  const { code = '' } = await searchParams;
  setRequestLocale(locale);
  return <ResetPasswordPageContent portal="school" code={code} />;
}
