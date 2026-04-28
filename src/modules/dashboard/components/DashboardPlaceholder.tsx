import { getTranslations } from 'next-intl/server';

interface DashboardPlaceholderProps {
  titleKey: string;
}

export async function DashboardPlaceholder({ titleKey }: DashboardPlaceholderProps) {
  const t = await getTranslations('Dashboard');
  const tCommon = await getTranslations('Common');

  return (
    <div>
      <h1 className='text-2xl font-bold text-ink-900'>{t(`nav.${titleKey}`)}</h1>
      <p className='mt-2 text-sm text-foggy'>{tCommon('comingSoon')}</p>
    </div>
  );
}
