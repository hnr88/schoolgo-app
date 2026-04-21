import type { ReactNode } from 'react';
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrustVariant = 'cricos' | 'qeac' | 'claimed';

interface TrustBadgeProps {
  variant: TrustVariant;
  label?: ReactNode;
  className?: string;
}

const DEFAULTS: Record<TrustVariant, { label: string; Icon: typeof ShieldCheck }> = {
  cricos: { label: 'CRICOS Verified', Icon: ShieldCheck },
  qeac: { label: 'QEAC Verified', Icon: BadgeCheck },
  claimed: { label: 'Claimed by school', Icon: BadgeCheck },
};

export function TrustBadge({ variant, label, className }: TrustBadgeProps) {
  const { label: defaultLabel, Icon } = DEFAULTS[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill bg-babu-50 px-2.5 py-1 text-xs font-semibold text-babu-700',
        className,
      )}
    >
      <Icon className='h-3.5 w-3.5' aria-hidden='true' strokeWidth={2} />
      {label ?? defaultLabel}
    </span>
  );
}
