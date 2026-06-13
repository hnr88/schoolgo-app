import { cn } from '@/lib/utils';
import { STATUS_TONE_STYLES } from '@/modules/core/constants/status.constants';
import type { StatusPillProps } from '@/modules/core/types/component.types';

/**
 * Canonical status pill (§3.10): h-6 pill, semantic bg/ink pairs from §2.5,
 * optional 12px leading icon. Use for application/enrolment status signals.
 */
export function StatusPill({ tone, children, icon: Icon, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-pill px-2.5 text-xs font-semibold',
        STATUS_TONE_STYLES[tone],
        className,
      )}
    >
      {Icon ? <Icon className='size-3 shrink-0' aria-hidden='true' /> : null}
      {children}
    </span>
  );
}
