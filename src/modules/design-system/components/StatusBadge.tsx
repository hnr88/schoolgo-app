import { cn } from '@/lib/utils';
import type { StatusBadgeProps } from '@/modules/design-system/types/design-system.types';
import { statusBadgeStyles } from '../constants/design-system.constants';

export function StatusBadge({
  tone,
  size,
  children,
  className,
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeStyles({ tone, size }), className)}>
      {children}
    </span>
  );
}
