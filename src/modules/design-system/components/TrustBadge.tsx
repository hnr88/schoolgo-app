import { cn } from '@/lib/utils';
import type { TrustBadgeProps } from '@/modules/design-system/types/design-system.types';
import { TRUST_BADGE_ICONS } from '../constants/design-system.constants';

export function TrustBadge({ variant, label, className }: TrustBadgeProps) {
  const Icon = TRUST_BADGE_ICONS[variant];
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
