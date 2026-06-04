import { cn } from '@/lib/utils';

interface ParentCompletenessRingProps {
  percent: number;
  isComplete: boolean;
  label: string;
}

const SIZE = 52;
const STROKE = 5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ParentCompletenessRing({ percent, isComplete, label }: ParentCompletenessRingProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;

  return (
    <span className='relative flex shrink-0 items-center justify-center' aria-hidden='true'>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className='-rotate-90'>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill='none'
          strokeWidth={STROKE}
          className='stroke-muted'
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill='none'
          strokeWidth={STROKE}
          strokeLinecap='round'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className={cn(
            'transition-all duration-500 ease-out-quart',
            isComplete ? 'stroke-vivid-mint' : 'stroke-primary',
          )}
        />
      </svg>
      <span className='absolute font-display text-xs font-bold tabular-nums text-ink-900'>
        {label}
      </span>
    </span>
  );
}
