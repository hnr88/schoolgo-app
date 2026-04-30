import { Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { ActionItem } from '@/modules/dashboard/types/dashboard.types';

export async function ActionBanner({ items }: { items: ActionItem[] }) {
  if (items.length === 0) return null;

  const t = await getTranslations('Dashboard.actionBanner');

  return (
    <div className='flex items-start gap-3 rounded-xl border border-babu-100 bg-babu-50 p-4'>
      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-vivid-mint-soft text-vivid-mint'>
        <Info className='h-4 w-4' strokeWidth={2} />
      </span>
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-bold uppercase tracking-wide text-babu-700'>
          {t('title')}
        </span>
        <ul className='flex flex-col gap-0.5'>
          {items.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className='text-sm text-ink-900 no-underline hover:underline'
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
