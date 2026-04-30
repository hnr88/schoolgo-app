import { getTranslations } from 'next-intl/server';
import { CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Deadline, DeadlineUrgency } from '@/modules/dashboard/types/dashboard.types';

const DATE_STYLE: Record<DeadlineUrgency, string> = {
  urgent: 'bg-rausch-100 text-rausch-700',
  high: 'bg-arches-100 text-arches-700',
  normal: 'bg-muted text-foggy',
};

export async function DeadlinesList({ deadlines }: { deadlines: Deadline[] }) {
  const t = await getTranslations('Dashboard.deadlines');

  return (
    <div className='flex flex-col rounded-xl border border-border bg-card shadow-1'>
      <div className='border-b border-divider px-5 py-4'>
        <h2 className='text-base font-bold text-ink-900'>{t('title')}</h2>
      </div>
      {deadlines.length === 0 ? (
        <div className='flex flex-col items-center gap-2 px-5 py-8'>
          <CheckCircle className='h-8 w-8 text-babu-500' strokeWidth={1.5} />
          <p className='text-sm text-foggy'>{t('empty')}</p>
        </div>
      ) : (
        <div className='flex flex-col divide-y divide-divider'>
          {deadlines.map((d) => {
            const [day, month] = d.date.split(' ');
            return (
              <Link
                key={d.id}
                href={d.href}
                className='group flex items-center gap-4 px-5 py-3.5 no-underline transition-colors hover:bg-muted'
              >
                <span
                  className={cn(
                    'flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl',
                    DATE_STYLE[d.urgency],
                  )}
                >
                  <span className='text-lg font-bold leading-tight'>{day}</span>
                  <span className='text-xs font-medium uppercase'>{month}</span>
                </span>
                <div className='min-w-0 flex-1'>
                  <span className='text-sm font-medium text-ink-900 group-hover:text-primary'>
                    {d.label}
                  </span>
                  {d.description && (
                    <span className='mt-0.5 block text-xs text-foggy'>{d.description}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
