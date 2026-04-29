import { cn } from '@/lib/utils';
import type { EyebrowProps } from '@/modules/design-system/types/design-system.types';

const TONE_CLASSES: Record<NonNullable<EyebrowProps['tone']>, string> = {
  default: 'text-foggy',
  brand: 'text-primary',
  trust: 'text-babu-700',
  featured: 'text-arches-700',
};

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
