import type { ReactNode } from 'react';
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrustVariant = 'cricos' | 'qeac' | 'claimed';

interface TrustBadgeProps {
  variant: TrustVariant;
  label: ReactNode;
  className?: string;
}

const ICONS: Record<TrustVariant, typeof ShieldCheck> = {
  cricos: ShieldCheck,
  qeac: BadgeCheck,
  claimed: BadgeCheck,
};

export function TrustBadge({ variant, label, className }: TrustBadgeProps) {
  const Icon = ICONS[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill bg-babu-50 px-2.5 py-1 text-xs font-semibold text-babu-700',
        className,
      )}
    >
      <Icon className='h-3.5 w-3.5' aria-hidden='true' strokeWidth={2} />
      {label}
    </span>
  );
}
