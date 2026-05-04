import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ActionBanner } from '@/modules/dashboard/components/ActionBanner';
import { PipelineCards } from '@/modules/dashboard/components/PipelineCards';
import { ActivityFeed } from '@/modules/dashboard/components/ActivityFeed';
import { DeadlinesList } from '@/modules/dashboard/components/DeadlinesList';
import { QuickActions } from '@/modules/dashboard/components/QuickActions';
import {
  DEMO_ACTION_ITEMS,
  DEMO_ACTIVITY,
  DEMO_DEADLINES,
  DEMO_PIPELINE_CARDS,
} from '@/modules/dashboard/constants/dashboard.constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Dashboard' });
  return { title: t('nav.dashboard') };
}

export default async function AgentDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='flex flex-col gap-6'>
      <ActionBanner items={DEMO_ACTION_ITEMS} />
      <PipelineCards cards={DEMO_PIPELINE_CARDS} />

      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <ActivityFeed events={DEMO_ACTIVITY} />
        <DeadlinesList deadlines={DEMO_DEADLINES} />
      </div>

      <QuickActions />
    </div>
  );
}
