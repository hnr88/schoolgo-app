import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenchmarkDeltaChipProps {
  delta: number | null;
  emptyLabel: string;
}

export function BenchmarkDeltaChip({ delta, emptyLabel }: BenchmarkDeltaChipProps) {
  if (delta === null) {
    return <span className='text-xs text-foggy'>{emptyLabel}</span>;
  }

  const isUp = delta > 0;
  const isDown = delta < 0;
  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
  const sign = isUp ? '+' : '';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-pill px-2 py-0.5 text-xs font-semibold tabular-nums',
        isUp && 'bg-vivid-mint-soft text-vivid-mint-strong',
        isDown && 'bg-vivid-coral-soft text-primary-strong',
        !isUp && !isDown && 'bg-muted text-foggy',
      )}
    >
      <Icon className='h-3 w-3' strokeWidth={2} aria-hidden='true' />
      {`${sign}${delta.toFixed(1)}`}
    </span>
  );
}
