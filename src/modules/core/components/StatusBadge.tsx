import { cn } from '@/lib/utils';
import type { StatusBadgeProps } from '@/modules/core/types/component.types';
import { FALLBACK_STYLES } from '../constants/status.constants';

export function StatusBadge({ status, label, styles }: StatusBadgeProps) {
  const resolved = styles[status] ?? FALLBACK_STYLES;

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', resolved.bg, resolved.text)}>
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', resolved.dot)} />
      {label}
    </span>
  );
}
