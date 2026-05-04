import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { QUICK_ACTIONS } from '../constants/ui.constants';

export async function QuickActions() {
  const t = await getTranslations('Dashboard.quickActions');

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {QUICK_ACTIONS.map(({ href, icon: Icon, labelKey, bg, color }) => (
        <Link
          key={href}
          href={href}
          className='group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 no-underline transition-colors hover:border-primary/30'
        >
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
              bg,
              color,
            )}
          >
            <Icon className='h-4 w-4' strokeWidth={1.75} />
          </span>
          <span className='text-sm font-semibold text-ink-900'>{t(labelKey)}</span>
        </Link>
      ))}
    </div>
  );
}
