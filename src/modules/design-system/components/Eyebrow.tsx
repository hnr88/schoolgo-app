import { cn } from '@/lib/utils';
import type { EyebrowProps } from '@/modules/design-system/types/design-system.types';
import { TONE_CLASSES } from '../constants/design-system.constants';

export function Eyebrow({ tone = 'default', className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        'text-label font-semibold uppercase tracking-[0.08em]',
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
