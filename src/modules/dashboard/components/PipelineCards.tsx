import { TrendingDown, TrendingUp, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { PipelineCard } from '@/modules/dashboard/types/dashboard.types';
import { CARD_STYLE } from '../constants/ui.constants';

export async function PipelineCards({ cards }: { cards: PipelineCard[] }) {
  const t = await getTranslations('Dashboard.cards');

  return (
    <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
      {cards.map((card) => {
        const style = CARD_STYLE[card.labelKey];
        const Icon = style?.icon ?? Users;
        const isPositive = card.change > 0;
        const isNegative = card.change < 0;
        return (
          <Link
            key={card.labelKey}
            href={card.href}
            className='flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 no-underline transition-colors hover:border-primary/30'
          >
            <span
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                style?.bg,
                style?.iconColor,
              )}
            >
              <Icon className='h-5 w-5' strokeWidth={1.75} />
            </span>
            <div className='min-w-0'>
              <span className='block text-xs text-foggy'>{t(card.labelKey)}</span>
              <span className='text-2xl font-bold text-ink-900'>{card.count}</span>
            </div>
            {card.change !== 0 && (
              <span
                className={cn(
                  'ml-auto flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                  isPositive && 'bg-babu-50 text-babu-700',
                  isNegative && 'bg-rausch-50 text-rausch-600',
                )}
              >
                {isPositive ? (
                  <TrendingUp className='h-3 w-3' strokeWidth={2} />
                ) : (
                  <TrendingDown className='h-3 w-3' strokeWidth={2} />
                )}
                {isPositive ? '+' : ''}
                {card.change}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
