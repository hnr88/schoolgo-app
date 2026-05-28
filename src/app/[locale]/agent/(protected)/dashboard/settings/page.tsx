import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AgentSettingsPage } from '@/modules/agent-settings';
import { PageHeader } from '@/modules/dashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AgentSettings' });
  return { title: t('title') };
}

export default async function AgentSettingsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AgentSettings');

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader title={t('title')} description={t('subtitle')} />

      <AgentSettingsPage />
    </div>
  );
}
