'use client';

import { TrendingDown, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { CARD_STYLE } from '@/modules/dashboard/constants/ui.constants';
import type { StatCardView } from '@/modules/dashboard/types/agent-dashboard.types';

export function PipelineCards({ cards }: { cards: StatCardView[] }) {
  const t = useTranslations('Dashboard.cards');

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {cards.map((card) => {
        const style = CARD_STYLE[card.labelKey];
        const Icon = style?.icon ?? Users;
        const isPositive = card.delta > 0;
        const isNegative = card.delta < 0;
        const label = t(card.labelKey);
        return (
          <Link
            key={card.labelKey}
            href={card.href}
            aria-label={`${label}: ${card.count}`}
            className='group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 no-underline shadow-1 transition-transform duration-200 ease-out-quart hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            <div className='flex items-center justify-between gap-2'>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                  style?.bg,
                  style?.iconColor,
                )}
              >
                <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
              </span>
              {card.delta !== 0 && (
                <span
                  className={cn(
                    'flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold tabular-nums',
                    isPositive && 'bg-babu-50 text-babu-700',
                    isNegative && 'bg-rausch-50 text-rausch-600',
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className='h-3 w-3' strokeWidth={2} aria-hidden='true' />
                  ) : (
                    <TrendingDown className='h-3 w-3' strokeWidth={2} aria-hidden='true' />
                  )}
                  {isPositive ? '+' : ''}
                  {card.delta}
                </span>
              )}
            </div>
            <span className='text-3xl font-bold leading-none text-ink-900 tabular-nums'>
              {card.count}
            </span>
            <span className='text-sm font-medium text-foggy'>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
